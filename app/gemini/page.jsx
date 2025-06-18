'use client';

import { useState } from 'react';
import { generateAnswer, scanReceipt } from './actions';

export default function Home() {
  const [tab, setTab] = useState('question');
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [receiptInfo, setReceiptInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const handleQuestionSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await generateAnswer(question);
      setAnswer(result);
    } catch (err) {
      setAnswer('Error generating answer.');
    }
    setLoading(false);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setLoading(true);
    try {
      const data = await scanReceipt(file);
      setReceiptInfo(data);
    } catch (err) {
      setReceiptInfo({ error: 'Failed to process receipt' });
    }
    setLoading(false);
  };


  return (
    <main style={{ padding: 20, fontFamily: 'sans-serif', maxWidth: 600, margin: '0 auto' }}>
      <h1>Smart Assistant</h1>
   
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <button onClick={() => setTab('question')}>Ask Question</button>
        <button onClick={() => setTab('receipt')}>Upload Receipt</button>
      </div>

      {tab === 'question' && (
        <form onSubmit={handleQuestionSubmit}>
          <label>
            Enter your question:
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What is compound interest?"
              style={{ width: '100%', marginTop: 10, marginBottom: 10 }}
            />
          </label>
          <button type="submit" disabled={loading}>
            {loading ? 'Generating...' : 'Get Answer'}
          </button>
          {answer && (
            <div style={{ marginTop: 20 }}>
              <h3>Answer:</h3>
              <p>{answer}</p>
            </div>
          )}
        </form>
      )}

      {tab === 'receipt' && (
        <div>
          <label>
            Upload a receipt image:
            <input type="file" accept="image/*" onChange={handleFileUpload} style={{ marginTop: 10 }} />
          </label>
          {loading && <p>Analyzing receipt...</p>}
          {receiptInfo && !receiptInfo.error && (
            <div style={{ marginTop: 20 }}>
              <h3>Extracted Receipt Info:</h3>
              <ul>
                <li><strong>Amount:</strong> ₹{receiptInfo.amount}</li>
                <li><strong>Date:</strong> {receiptInfo.date.toString()}</li>
                <li><strong>Description:</strong> {receiptInfo.description}</li>
                <li><strong>Merchant:</strong> {receiptInfo.merchantName}</li>
                <li><strong>Category:</strong> {receiptInfo.category}</li>
              </ul>
            </div>
          )}
          {receiptInfo?.error && <p style={{ color: 'red' }}>{receiptInfo.error}</p>}
        </div>
      )}
    </main>
  );
}
