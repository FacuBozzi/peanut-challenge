import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/jest-globals';
import '@testing-library/jest-dom';
import { GET } from '@/app/api/payment/[id]/route';
import { NextResponse } from 'next/server';

describe('Payment API', () => {
  it('returns the correct payment link for a valid ID', async () => {
    // Mock the params object that Next.js would pass to the handler
    const params = { id: 'abc123' };
    
    // Call the GET handler directly
    const response = await GET({} as Request, { params });
    
    // Parse the response JSON
    const data = await response.json();
    
    // Check that we got the expected data
    expect(data).toEqual({
      type: 'send',
      amount: 6969,
      username: 'peanut',
      status: 'unclaimed'
    });
  });

  it('returns a 404 error for an invalid ID', async () => {
    // Mock the params object with an invalid ID
    const params = { id: 'invalid-id' };
    
    // Call the GET handler directly
    const response = await GET({} as Request, { params });
    
    // Check the status code
    expect(response.status).toBe(404);
    
    // Parse the response JSON
    const data = await response.json();
    
    // Check that we got the expected error
    expect(data).toEqual({ error: 'Not found' });
  });
});