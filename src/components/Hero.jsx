// Hero.jsx - Working Implementation Based on USDARK Reference
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { PublicKey, VersionedTransaction, LAMPORTS_PER_SOL } from '@solana/web3.js';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faChevronDown, faSearch } from '@fortawesome/free-solid-svg-icons';

// Constants
const SOL_MINT = 'So11111111111111111111111111111111111111112';
const DEFAULT_PEPIQ_MINT = 'E5f6YvS1d3LuSmybcqp79HtwpyBj8WecdqnkBmfZpump';
const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';

const Hero = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  
  // States
  const [allTokens, setAllTokens] = useState([]);
  const [inputToken, setInputToken] = useState(null);
  const [outputToken, setOutputToken] = useState(null);
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [slippage, setSlippage] = useState(1);
  const [balance, setBalance] = useState(0);
  const [tokenBalance, setTokenBalance] = useState(0);
  
  // Dropdown states
  const [showInputTokenSearch, setShowInputTokenSearch] = useState(false);
  const [showOutputTokenSearch, setShowOutputTokenSearch] = useState(false);
  const [inputSearchQuery, setInputSearchQuery] = useState('');
  const [outputSearchQuery, setOutputSearchQuery] = useState('');
  
  const inputDropdownRef = useRef(null);
  const outputDropdownRef = useRef(null);
  const timeoutRef = useRef(null);

  // Popular tokens (always available)
  const getPopularTokens = () => [
    {
      address: SOL_MINT,
      symbol: 'SOL',
      name: 'Solana',
      decimals: 9,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png'
    },
    {
      address: USDC_MINT,
      symbol: 'USDC',
      name: 'USD Coin',
      decimals: 6,
      logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png'
    },
    {
      address: DEFAULT_PEPIQ_MINT,
      symbol: 'PEPIQ',
      name: 'PEPE IQ',
      decimals: 6,
      logoURI: '/assets/logo.png'
    }
  ];

  // Load tokens
  useEffect(() => {
    const loadTokens = async () => {
      try {
        // Use Jupiter's v2 token list API
        const response = await fetch('https://lite-api.jup.ag/tokens/v2/tag?query=verified');
        
        if (response.ok) {
          const tokens = await response.json();
          const tokenList = Array.isArray(tokens) ? tokens : [];
          
          // Add PEPIQ if not in list
          const pepiqExists = tokenList.some(t => t.address === DEFAULT_PEPIQ_MINT);
          if (!pepiqExists) {
            tokenList.push(getPopularTokens()[2]);
          }
          
          setAllTokens(tokenList);
          
          const sol = tokenList.find(t => t.address === SOL_MINT) || getPopularTokens()[0];
          const pepiq = tokenList.find(t => t.address === DEFAULT_PEPIQ_MINT) || getPopularTokens()[2];
          
          setInputToken(sol);
          setOutputToken(pepiq);
        } else {
          throw new Error('API failed');
        }
      } catch (err) {
        console.error('Token list error:', err);
        const fallback = getPopularTokens();
        setAllTokens(fallback);
        setInputToken(fallback[0]);
        setOutputToken(fallback[2]);
      }
    };
    loadTokens();
  }, []);

  // Fetch balances
  useEffect(() => {
    const fetchBalances = async () => {
      if (wallet.connected && wallet.publicKey) {
        try {
          const solBalance = (await connection.getBalance(wallet.publicKey)) / LAMPORTS_PER_SOL;
          setBalance(solBalance);
        } catch (e) {
          console.error('Balance error:', e);
          setBalance(0);
        }
        
        if (outputToken && outputToken.address !== SOL_MINT) {
          try {
            const mint = new PublicKey(outputToken.address);
            const ata = getAssociatedTokenAddressSync(mint, wallet.publicKey);
            const tokenBal = await connection.getTokenAccountBalance(ata);
            setTokenBalance(tokenBal.value.uiAmount || 0);
          } catch (e) {
            setTokenBalance(0);
          }
        }
      }
    };
    fetchBalances();
    const interval = setInterval(fetchBalances, 30000);
    return () => clearInterval(interval);
  }, [wallet.connected, connection, wallet.publicKey, outputToken]);

  // Close dropdowns
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (inputDropdownRef.current && !inputDropdownRef.current.contains(event.target)) {
        setShowInputTokenSearch(false);
      }
      if (outputDropdownRef.current && !outputDropdownRef.current.contains(event.target)) {
        setShowOutputTokenSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const copyCA = () => {
    navigator.clipboard.writeText(outputToken?.address || DEFAULT_PEPIQ_MINT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const filterTokens = (query) => {
    if (!query) return allTokens.slice(0, 50);
    const q = query.toLowerCase();
    return allTokens.filter(t => 
      t.symbol?.toLowerCase().includes(q) || 
      t.name?.toLowerCase().includes(q) ||
      t.address?.toLowerCase().includes(q)
    ).slice(0, 50);
  };

  // Get quote - using USDARK approach
  const getQuoteInternal = async (amount) => {
    if (!amount || !wallet.publicKey || !inputToken || !outputToken) return;
    setErrorMessage('');
    
    try {
      const inputMint = new PublicKey(inputToken.address);
      const outputMint = new PublicKey(outputToken.address);
      const inputDecimals = inputToken.decimals || 9;
      const outputDecimals = outputToken.decimals || 6;
      
      const amountInLamports = Math.floor(parseFloat(amount) * (10 ** inputDecimals));
      
      if (amountInLamports <= 0) throw new Error('Invalid amount');
      
      const params = new URLSearchParams({
        inputMint: inputMint.toString(),
        outputMint: outputMint.toString(),
        amount: amountInLamports.toString(),
        slippageBps: Math.floor(slippage * 100).toString(),
      });
      
      const quoteRes = await fetch(`https://lite-api.jup.ag/swap/v1/quote?${params}`);
      
      if (!quoteRes.ok) {
        const errorText = await quoteRes.text();
        throw new Error(`Quote failed: ${quoteRes.status} - ${errorText}`);
      }
      
      const quoteData = await quoteRes.json();
      const outAmount = parseFloat(quoteData.outAmount) / (10 ** outputDecimals);
      
      setAmountOut(outAmount.toFixed(6));
      return quoteData;
    } catch (e) {
      console.error('Quote error:', e);
      setErrorMessage(e.message || 'No route found');
      setAmountOut('');
    }
  };

  // Debounced quote fetch
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    if (!inputToken || !outputToken || !amountIn || !wallet.connected) {
      setAmountOut('');
      setLoading(false);
      return;
    }
    
    timeoutRef.current = setTimeout(async () => {
      setLoading(true);
      await getQuoteInternal(amountIn);
      setLoading(false);
    }, 500);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [amountIn, inputToken, outputToken, slippage, wallet.connected]);

  // Execute swap - USDARK approach
  const executeSwap = async () => {
    if (!wallet.connected || !amountIn || !wallet.publicKey || !inputToken || !outputToken) return;
    
    setErrorMessage('');
    setTxLoading(true);
    
    try {
      const inputMint = new PublicKey(inputToken.address);
      const outputMint = new PublicKey(outputToken.address);
      const inputDecimals = inputToken.decimals || 9;
      
      const amountInLamports = Math.floor(parseFloat(amountIn) * (10 ** inputDecimals));
      
      if (amountInLamports <= 0) throw new Error('Invalid amount');
      
      // Get quote
      const params = new URLSearchParams({
        inputMint: inputMint.toString(),
        outputMint: outputMint.toString(),
        amount: amountInLamports.toString(),
        slippageBps: Math.floor(slippage * 100).toString(),
      });
      
      const quoteRes = await fetch(`https://lite-api.jup.ag/swap/v1/quote?${params}`);
      
      if (!quoteRes.ok) {
        throw new Error(`Quote failed: ${quoteRes.status}`);
      }
      
      const quoteData = await quoteRes.json();
      
      // Get swap transaction
      const swapRes = await fetch('https://lite-api.jup.ag/swap/v1/swap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quoteResponse: quoteData,
          userPublicKey: wallet.publicKey.toString(),
          wrapAndUnwrapSol: true,
          dynamicComputeUnitLimit: true,
          prioritizationFeeLamports: 'auto',
        }),
      });
      
      if (!swapRes.ok) {
        throw new Error(`Swap failed: ${swapRes.status}`);
      }
      
      const { swapTransaction } = await swapRes.json();
      const swapTransactionBuf = Uint8Array.from(atob(swapTransaction), (c) => c.charCodeAt(0));
      const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
      
      const signedTx = await wallet.signTransaction(transaction);
      const txid = await connection.sendRawTransaction(signedTx.serialize(), {
        skipPreflight: false,
        preflightCommitment: 'confirmed',
      });
      
      await connection.confirmTransaction(txid, 'confirmed');
      
      alert(`✅ Swap Successful!\n\nView: https://solscan.io/tx/${txid}`);
      
      setAmountIn('');
      setAmountOut('');
    } catch (e) {
      console.error('Swap error:', e);
      setErrorMessage(e.message || 'Swap failed. Try increasing slippage.');
    } finally {
      setTxLoading(false);
    }
  };

  const pricePerToken = amountIn && amountOut && parseFloat(amountIn) > 0
    ? (parseFloat(amountOut) / parseFloat(amountIn)).toFixed(6)
    : '-';

  const minReceived = amountOut
    ? (parseFloat(amountOut) * (1 - slippage / 100)).toFixed(6)
    : '--';

  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>PEPE IQ<br />x402</h1>
          
          <div className="ca-box">
            <label>Contract Address</label>
            <div className="ca-input-wrapper">
              <input type="text" value={outputToken?.address || DEFAULT_PEPIQ_MINT} readOnly />
              <button onClick={copyCA}>{copied ? '✓' : 'Copy'}</button>
            </div>
          </div>
          
          <p className="hero-desc">
            AI chat agent meets meme culture featuring x402 integration on Solana
          </p>
          
          <div className="hero-subtitle">
            Chat with PEPIQ AI, your intelligent companion built on ElizaOS Cloud...
          </div>
          
          <div className="hero-actions">
            <a href="#swap" className="btn btn-primary">BUY $PEPIQ</a>
            <a style={{ cursor: 'not-allowed' }} className="btn btn-secondary">
              PEPIQ SIGNAL (SOON) <FontAwesomeIcon icon={faRobot} />
            </a>
          </div>
        </div>

        <div className="hero-swap" id="swap">
          <div className="swap-box">
            <div className="swap-header">
              <h3>Swap Tokens</h3>
              {/* <span className="powered-by">Jupiter</span> */}
                <div>
              <WalletMultiButton style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
            </div>
            </div>

          

            <div className="swap-form">
              <div className="swap-input-group">
                <div className="swap-input from">
                  <div className="token-select-container" ref={inputDropdownRef}>
                    <button 
                      className="token-select"
                      onClick={() => setShowInputTokenSearch(!showInputTokenSearch)}
                    >
                      {inputToken?.logoURI && (
                        <img src={inputToken.logoURI} alt={inputToken.symbol} onError={(e) => e.target.style.display = 'none'} />
                      )}
                      <span>{inputToken?.symbol || 'Select'}</span>
                      <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                    </button>
                    
                    {showInputTokenSearch && (
                      <div className="token-dropdown">
                        <div className="token-search">
                          <FontAwesomeIcon icon={faSearch} className="search-icon" />
                          <input
                            type="text"
                            placeholder="Search..."
                            value={inputSearchQuery}
                            onChange={(e) => setInputSearchQuery(e.target.value)}
                            autoFocus
                          />
                        </div>
                        <div className="token-list">
                          {filterTokens(inputSearchQuery).map((token) => (
                            <button
                              key={token.address}
                              className="token-item"
                              onClick={() => {
                                setInputToken(token);
                                setShowInputTokenSearch(false);
                                setInputSearchQuery('');
                              }}
                            >
                              {token.logoURI && <img src={token.logoURI} alt={token.symbol} onError={(e) => e.target.style.display = 'none'} />}
                              <div className="token-info">
                                <span className="token-symbol">{token.symbol}</span>
                                <span className="token-name">{token.name}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <input
                    type="number"
                    placeholder="0.0"
                    value={amountIn}
                    onChange={(e) => setAmountIn(e.target.value)}
                    disabled={!wallet.connected}
                    step="0.001"
                  />
                </div>

                <div className="swap-arrow-container">
                  <button 
                    className="swap-arrow"
                    onClick={() => {
                      const temp = inputToken;
                      setInputToken(outputToken);
                      setOutputToken(temp);
                      setAmountIn('');
                      setAmountOut('');
                    }}
                  >
                    ↓
                  </button>
                </div>

                <div className="swap-input to">
                  <div className="token-select-container" ref={outputDropdownRef}>
                    <button 
                      className="token-select"
                      onClick={() => setShowOutputTokenSearch(!showOutputTokenSearch)}
                    >
                      {outputToken?.logoURI && (
                        <img src={outputToken.logoURI} alt={outputToken.symbol} onError={(e) => e.target.style.display = 'none'} />
                      )}
                      <span>{outputToken?.symbol || 'Select'}</span>
                      <FontAwesomeIcon icon={faChevronDown} className="dropdown-arrow" />
                    </button>
                    
                    {showOutputTokenSearch && (
                      <div className="token-dropdown">
                        <div className="token-search">
                          <FontAwesomeIcon icon={faSearch} className="search-icon" />
                          <input
                            type="text"
                            placeholder="Search..."
                            value={outputSearchQuery}
                            onChange={(e) => setOutputSearchQuery(e.target.value)}
                            autoFocus
                          />
                        </div>
                        <div className="token-list">
                          {filterTokens(outputSearchQuery).map((token) => (
                            <button
                              key={token.address}
                              className="token-item"
                              onClick={() => {
                                setOutputToken(token);
                                setShowOutputTokenSearch(false);
                                setOutputSearchQuery('');
                              }}
                            >
                              {token.logoURI && <img src={token.logoURI} alt={token.symbol} onError={(e) => e.target.style.display = 'none'} />}
                              <div className="token-info">
                                <span className="token-symbol">{token.symbol}</span>
                                <span className="token-name">{token.name}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <input
                    type="text"
                    placeholder="0.0"
                    value={loading ? 'Loading...' : amountOut}
                    readOnly
                  />
                </div>
              </div>

              <div className="swap-details">
                {errorMessage && (
                  <div className="error-message">
                    ⚠️ {errorMessage}
                  </div>
                )}
                
                <div className="detail-item">
                  <span>Price</span>
                  <span>{pricePerToken} per {inputToken?.symbol}</span>
                </div>
                
                <div className="detail-item">
                  <span>Slippage</span>
                  <select
                    value={slippage}
                    onChange={(e) => setSlippage(parseFloat(e.target.value))}
                    className="slippage-select"
                  >
                    <option value="0.5">0.5%</option>
                    <option value="1">1%</option>
                    <option value="3">3%</option>
                    <option value="5">5%</option>
                    <option value="10">10%</option>
                  </select>
                </div>
                
                <div className="detail-item">
                  <span>Min Received</span>
                  <span>{minReceived} {outputToken?.symbol}</span>
                </div>
                
                {wallet.connected && (
                  <div className="detail-item">
                    <span>Balance</span>
                    <span>{balance.toFixed(4)} SOL</span>
                  </div>
                )}
              </div>

              {wallet.connected ? (
                <button
                  className="btn btn-primary swap-btn"
                  onClick={executeSwap}
                  style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                  disabled={loading || txLoading || !amountOut || !!errorMessage}
                >
                  {txLoading ? 'Swapping...' : loading ? 'Loading...' : 'Swap'}
                </button>
              ) : (
                <div className="connect-prompt">
                  Connect wallet to swap
                </div>
              )}
            </div>

            <div className="swap-footer">
              <span className="dev-note">Powered by Jupiter</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;