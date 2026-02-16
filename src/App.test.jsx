import { render, screen } from "@testing-library/react";
import App from "./App";
import { describe, expect, test } from "vitest";
import userEvent from '@testing-library/user-event'

describe("Invoice App", () => {
  test("renders app without crashing", () => {
    render(<App />);
  });

  test("renders invoice heading", () => {
    render(<App />);
    const heading = screen.getByRole("heading", { name: /invoices/i });
    expect(heading).toBeInTheDocument();
  });

  test("shows empty state initially", () => {
    render(<App />);
    const emptyMessage = screen.getByText(/no invoices found/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  test('renders new invoice button', () => {
  render(<App />)
  const button = screen.getByRole('button', { name: /new invoice/i })
  expect(button).toBeInTheDocument()
})



test('clicking new invoice button triggers action', async () => {
  render(<App />)

  const button = screen.getByRole('button', { name: /new invoice/i })
  await userEvent.click(button)

  // Then assert something changes
})

});
