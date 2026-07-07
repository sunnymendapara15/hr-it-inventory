import { useEffect, useState } from 'react';
import { createInventoryItem, fetchInventory } from './api';
import './App.css';

const initialForm = {
  name: '',
  description: '',
  quantity: 1,
  notes: ''
};

function App() {
  const [formData, setFormData] = useState(initialForm);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);

  const loadInventory = async () => {
    setLoading(true);
    setMessage(null);

    try {
      const data = await fetchInventory();
      setItems(Array.isArray(data) ? data : []);
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInventory();
  }, []);

  const handleChange = (field) => (event) => {
    const value = field === 'quantity' ? Number(event.target.value) : event.target.value;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);

    try {
      await createInventoryItem(formData);
      setFormData(initialForm);
      await loadInventory();
      setMessage({ type: 'success', text: 'Inventory item added.' });
    } catch (error) {
      setMessage({ type: 'error', text: error.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="app-shell">
      <header>
        <h1>HR IT Inventory</h1>
        <p>Capture company-owned devices and accessories so HR always knows what exists.</p>
      </header>

      <section className="panel">
        <h2>Add inventory</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name<span>*</span>
            <input
              type="text"
              value={formData.name}
              onChange={handleChange('name')}
              required
              maxLength={100}
            />
          </label>

          <label>
            Description
            <textarea
              value={formData.description}
              onChange={handleChange('description')}
              rows={3}
              maxLength={300}
            />
          </label>

          <label>
            Quantity<span>*</span>
            <input
              type="number"
              min="0"
              value={formData.quantity}
              onChange={handleChange('quantity')}
              required
            />
          </label>

          <label>
            Notes
            <textarea
              value={formData.notes}
              onChange={handleChange('notes')}
              rows={2}
              maxLength={500}
            />
          </label>

          <button type="submit" disabled={submitting}>
            {submitting ? 'Saving…' : 'Save item'}
          </button>

          {message && (
            <p className={`message ${message.type}`}>
              {message.text}
            </p>
          )}
        </form>
      </section>

      <section className="panel">
        <div className="panel-heading">
          <h2>Inventory list</h2>
          <button type="button" onClick={loadInventory} disabled={loading}>
            Refresh
          </button>
        </div>

        {loading ? (
          <p>Loading inventory…</p>
        ) : items.length === 0 ? (
          <p className="empty">No inventory recorded yet.</p>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Description</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id}>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.description || '-'}</td>
                    <td>{item.notes || '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;
