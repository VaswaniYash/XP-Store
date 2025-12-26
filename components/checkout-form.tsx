'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, CheckCircle } from 'lucide-react';

interface CheckoutFormProps {
  total: number;
  itemCount: number;
  onSuccess?: () => void;
}

export function CheckoutForm({ total, itemCount, onSuccess }: CheckoutFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState<'shipping' | 'payment' | 'complete'>('shipping');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardName: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      formData.firstName &&
      formData.lastName &&
      formData.address &&
      formData.city &&
      formData.state &&
      formData.zipCode
    ) {
      setStep('payment');
      setError('');
    } else {
      setError('Please fill in all shipping fields');
    }
  };

  const handlePaymentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Simulate payment processing
    setTimeout(() => {
      if (formData.cardNumber && formData.cvv) {
        setStep('complete');
        setTimeout(() => {
          onSuccess?.();
        }, 2000);
      } else {
        setError('Please fill in all payment fields');
        setLoading(false);
      }
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Steps Indicator */}
      <div className="flex gap-4 justify-center mb-8">
        {(['shipping', 'payment', 'complete'] as const).map((s) => (
          <div
            key={s}
            className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold capitalize ${
              step === s
                ? 'bg-accent text-accent-foreground'
                : step > s
                ? 'bg-green-600 text-white'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {s === 'complete' ? '✓' : s[0].toUpperCase()}
          </div>
        ))}
      </div>

      {/* Shipping Address */}
      {step === 'shipping' && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleShippingSubmit} className="space-y-4">
              {error && (
                <div className="flex gap-2 p-3 bg-destructive/10 border border-destructive rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="John"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="Doe"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="123 Main St"
                  required
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="New York"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="NY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    ZIP Code
                  </label>
                  <input
                    type="text"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="10001"
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                Continue to Payment
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Payment Information */}
      {step === 'payment' && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle>Payment Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePaymentSubmit} className="space-y-4">
              {error && (
                <div className="flex gap-2 p-3 bg-destructive/10 border border-destructive rounded-lg">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Cardholder Name
                </label>
                <input
                  type="text"
                  name="cardName"
                  value={formData.cardName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="John Doe"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                  placeholder="4111 1111 1111 1111"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="MM/YY"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 bg-input border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent"
                    placeholder="123"
                    required
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStep('shipping')}
                  className="flex-1"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                >
                  {loading ? 'Processing...' : 'Complete Purchase'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Order Complete */}
      {step === 'complete' && (
        <Card className="bg-green-600/10 border border-green-600">
          <CardContent className="pt-8 text-center">
            <div className="mb-4">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-2">Order Placed Successfully!</h3>
            <p className="text-muted-foreground mb-4">
              Your order has been confirmed. We'll send you an email with order details.
            </p>
            <p className="text-lg font-semibold text-foreground mb-6">
              Total: ₹{(total * 1.1).toFixed(2)}
            </p>
          </CardContent>
        </Card>
      )}

      {/* Order Summary */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-foreground">
            <span>Items ({itemCount})</span>
            <span>₹{total.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-foreground">
            <span>Tax (10%)</span>
            <span>₹{(total * 0.1).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-foreground">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="border-t border-border pt-3 flex justify-between text-lg font-bold text-foreground">
            <span>Total</span>
            <span className="text-secondary">₹{(total * 1.1).toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
