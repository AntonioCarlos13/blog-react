import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { LinkButton } from "./LinkButton";

describe("<LinkButton />", () => {
  it('should render the button with the text "Mais Posts"', () => {
    render(<LinkButton text="Mais Posts" />);

    expect.assertions(1);

    const button = screen.getByRole("button", { name: /mais posts/i });
    expect(button).toBeInTheDocument();
  });

  it("should call function on button click", () => {
    const fn = jest.fn();
    render(<LinkButton text="Mais Posts" onClick={fn} />);

    const button = screen.getByRole("button", { name: /mais posts/i });

    userEvent.click(button);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled is true", () => {
    render(<LinkButton text="Mais Posts" disabled={true} />);
    const button = screen.getByRole("button", { name: /mais posts/i });
    expect(button).toBeDisabled();
  });

  it("should be enabled when disabled is false", () => {
    const fn = jest.fn();
    render(<LinkButton text="Mais Posts" disabled={false} onClick={fn} />);
    const button = screen.getByRole("button", { name: /mais posts/i });
    expect(button).toBeEnabled();
  });
});
