// Hero.jsx - CORRECTED for Current Jupiter Ultra API (January 2026)
// Base URL: https://api.jup.ag/ultra/v1 (lite-api.jup.ag is deprecated)
// /order is GET with query params (not POST)
// Requires x-api-key header
// Flow: GET /order (with taker) → sign tx → POST /execute

import React, { useState, useEffect, useCallback } from 'react';
import { useWallet, useConnection } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { VersionedTransaction } from '@solana/web3.js';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot } from '@fortawesome/free-solid-svg-icons';

// Constants
const SOL_MINT = 'So11111111111111111111111111111111111111112';
const PEPIQ_MINT = 'E5f6YvS1d3LuSmybcqp79HtwpyBj8WecdqnkBmfZpump';

// Current Ultra API base (lite-api deprecated Jan 31 2026)
const JUPITER_API = 'https://api.jup.ag/ultra/v1';

// Your full API key (keep secret - use .env in prod!)
const YOUR_API_KEY = 'cc40b0a5-00e2-4e41-863c-f5471fe2b3ee'; // <-- Full key here

const MIN_SWAP_AMOUNT = 0.01;

const Hero = () => {
  const { publicKey, connected, signTransaction } = useWallet();
  const { connection } = useConnection();
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [txLoading, setTxLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [slippage, setSlippage] = useState(0.5);

  const copyCA = () => {
    navigator.clipboard.writeText(PEPIQ_MINT).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Fetch quote - Ultra /quote works with GET + api key header
  const fetchQuote = useCallback(async () => {
    setErrorMessage('');
    if (!connected || !amountIn || parseFloat(amountIn) <= 0) {
      setAmountOut('');
      setQuote(null);
      return;
    }
    if (parseFloat(amountIn) < MIN_SWAP_AMOUNT) {
      setErrorMessage(`Minimum swap amount is ${MIN_SWAP_AMOUNT} SOL`);
      setAmountOut('');
      setQuote(null);
      return;
    }

    setLoading(true);
    try {
      const amount = Math.floor(parseFloat(amountIn) * 1e9);
      const slippageBps = Math.floor(slippage * 100);

      const params = new URLSearchParams({
        inputMint: SOL_MINT,
        outputMint: PEPIQ_MINT,
        amount: amount.toString(),
        slippageBps: slippageBps.toString(),
      });

      const { data } = await axios.get(`${JUPITER_API}/quote?${params}`, {
        headers: { 'x-api-key': YOUR_API_KEY },
      });

      if (!data || !data.outAmount) throw new Error('No route found');

      const decimals = 6;
      const outputAmount = (BigInt(data.outAmount) / BigInt(10 ** decimals)).toString();

      setAmountOut(outputAmount);
      setQuote(data);
    } catch (err) {
      console.error('Quote error:', err);
      setAmountOut('');
      setQuote(null);
      setErrorMessage('No route/liquidity found. Token may have no liquidity or be rugged.');
    } finally {
      setLoading(false);
    }
  }, [amountIn, connected, slippage]);

  useEffect(() => {
    const debounce = setTimeout(() => fetchQuote(), 500);
    return () => clearTimeout(debounce);
  }, [fetchQuote]);

  // Execute swap: GET /order → sign → POST /execute
  const executeSwap = async () => {
    if (!connected || !quote || !publicKey || !signTransaction) return;
    if (parseFloat(amountIn) < MIN_SWAP_AMOUNT) {
      setErrorMessage(`Minimum swap amount is ${MIN_SWAP_AMOUNT} SOL`);
      return;
    }

    setTxLoading(true);
    setErrorMessage('');

    try {
      // Step 1: GET /order with params (including taker)
      const params = new URLSearchParams({
        inputMint: SOL_MINT,
        outputMint: PEPIQ_MINT,
        amount: quote.inAmount,
        slippageBps: Math.floor(slippage * 100).toString(),
        taker: publicKey.toBase58(),
        wrapAndUnwrapSol: 'true',
      });

      const { data: orderData } = await axios.get(`${JUPITER_API}/order?${params}`, {
        headers: { 'x-api-key': YOUR_API_KEY },
      });

      if (!orderData.transaction || !orderData.requestId) {
        throw new Error('Invalid order response');
      }

      // Step 2: Deserialize & sign transaction
      const txBuf = Buffer.from(orderData.transaction, 'base64');
      const transaction = VersionedTransaction.deserialize(txBuf);
      const signedTx = await signTransaction(transaction);
      const signedBase64 = Buffer.from(signedTx.serialize()).toString('base64');

      // Step 3: POST /execute - Jupiter lands the tx (fast + often gasless)
      const { data: executeData } = await axios.post(
        `${JUPITER_API}/execute`,
        {
          signedTransaction: signedBase64,
          requestId: orderData.requestId,
        },
        {
          headers: {
            'x-api-key': YOUR_API_KEY,
            'Content-Type': 'application/json',
          },
        }
      );

      if (executeData.status !== 'Success') {
        throw new Error(executeData.error || 'Execution failed');
      }

      alert(`Swap successful! 🎉\n\nSignature: ${executeData.signature}\nView: https://solscan.io/tx/${executeData.signature}`);

      // Reset
      setAmountIn('');
      setAmountOut('');
      setQuote(null);
    } catch (err) {
      console.error('Swap error:', err);
      if (err.message?.includes('User rejected')) {
        setErrorMessage('Transaction rejected by user');
      } else {
        setErrorMessage('Swap failed – likely no liquidity. Try higher slippage or check token.');
      }
    } finally {
      setTxLoading(false);
    }
  };

  const pricePerSol = amountIn && amountOut && parseFloat(amountIn) > 0
    ? (parseFloat(amountOut) / parseFloat(amountIn)).toFixed(4)
    : '-';

  const minReceived = amountOut
    ? (parseFloat(amountOut) * (1 - slippage / 100)).toFixed(6)
    : '--';

  return (
    <section className="hero">
      {/* UI unchanged - same as before */}
      <div className="container">
        <div className="hero-content">
          <h1>PEPE IQ<br />x402</h1>
          <div className="ca-box">
            <label>Contract Address</label>
            <div className="ca-input-wrapper">
              <input type="text" value={PEPIQ_MINT} readOnly />
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
              PEPIQ SIGNAL (SOON)<FontAwesomeIcon icon={faRobot} />
            </a>
          </div>
        </div>
        <div className="hero-swap">
          <div className="swap-box">
            <div className="swap-header">
              <h3>Swap SOL → PEPIQ</h3>
              <span style={{ fontSize: '0.75rem', opacity: 0.7 }}>Powered by Jupiter Aggregator</span>
            </div>
            <div style={{ padding: '0 1rem', marginBottom: '1rem' }}>
              <WalletMultiButton style={{ width: '100%', height: '48px', borderRadius: '12px' }} />
            </div>
            <div className="swap-form">
              <div className="swap-input-group">
                <div className="swap-input from">
                  <div className="token-select">
                    <img src="/assets/solana-logo.png" alt="SOL" />
                    <span>SOL</span>
                  </div>
                  <input
                    type="number"
                    placeholder="0.0"
                    value={amountIn}
                    onChange={(e) => setAmountIn(e.target.value)}
                    disabled={!connected}
                    min={MIN_SWAP_AMOUNT}
                    step="0.01"
                  />
                </div>
                <div className="swap-arrow-container">
                  <button className="swap-arrow">↓</button>
                </div>
                <div className="swap-input to">
                  <div className="token-select">
                    <img src="/assets/logo.png" alt="$PEPIQ" />
                    <span>$PEPIQ</span>
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
                  <div style={{ color: '#ff4444', marginBottom: '0.5rem', fontWeight: '500' }}>
                    ⚠️ {errorMessage}
                  </div>
                )}
                <div className="detail-item">
                  <span>Price</span>
                  <span>{pricePerSol} $PEPIQ per SOL</span>
                </div>
                <div className="detail-item">
                  <span>Slippage</span>
                  <select
                    value={slippage}
                    onChange={(e) => setSlippage(parseFloat(e.target.value))}
                    style={{ background: 'transparent', border: 'none', color: 'inherit', cursor: 'pointer' }}
                  >
                    <option value="0.1">0.1%</option>
                    <option value="0.5">0.5%</option>
                    <option value="1">1%</option>
                    <option value="3">3%</option>
                  </select>
                </div>
                <div className="detail-item">
                  <span>Min Received</span>
                  <span>{minReceived} $PEPIQ</span>
                </div>
              </div>
              {connected ? (
                <button
                  className="btn btn-primary swap-btn"
                  onClick={executeSwap}
                  disabled={loading || txLoading || !quote || !!errorMessage}
                >
                  {txLoading ? 'Swapping...' : loading ? 'Getting Quote...' : 'Swap'}
                </button>
              ) : (
                <div style={{ color: '#888', textAlign: 'center', padding: '1rem' }}>
                  Connect wallet to swap
                </div>
              )}
            </div>
            <div className="swap-footer">
              <span className="dev-note">Powered by Jupiter • Live on Solana</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;