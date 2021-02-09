import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";
import App from "./App";

// smoke test
it("testing if the app renders without crashing", function () {
	render(<App />);
});

// snapshot test
it("matches snapshot", function () {
	const { asFragment } = render(<App />);
	expect(asFragment()).toMatchSnapshot();
});

it("works when you click on the right arrow", function () {
	const { queryByTestId, queryByAltText } = render(<Carousel />);

	// expect the first image to show, but not the second
	expect(
		queryByAltText("Photo by Richard Pasquarella on Unsplash")
	).toBeInTheDocument();
	expect(
		queryByAltText("Photo by Pratik Patel on Unsplash")
	).not.toBeInTheDocument();

	// move forward in the carousel
	const rightArrow = queryByTestId("right-arrow");
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(
		queryByAltText("Photo by Richard Pasquarella on Unsplash")
	).not.toBeInTheDocument();
	expect(
		queryByAltText("Photo by Pratik Patel on Unsplash")
	).toBeInTheDocument();

	// rightArrow is missing when on the last element
	fireEvent.click(rightArrow); //another click needed
	expect(queryByTestId("right-arrow")).toHaveClass("Carousel-hidden");
});

it("works when you click on the left arrow", function () {
	const { queryByTestId, queryByAltText } = render(<Carousel />);
	// move forward in the carousel
	const rightArrow = queryByTestId("right-arrow");
	fireEvent.click(rightArrow);

	// expect the second image to show, but not the first
	expect(
		queryByAltText("Photo by Richard Pasquarella on Unsplash")
	).not.toBeInTheDocument();
	expect(
		queryByAltText("Photo by Pratik Patel on Unsplash")
	).toBeInTheDocument();

	// move backward in the carousel
	const leftArrow = queryByTestId("left-arrow");
	fireEvent.click(leftArrow);

	// expect the first image to show, but not the second
	expect(
		queryByAltText("Photo by Richard Pasquarella on Unsplash")
	).toBeInTheDocument();
	expect(
		queryByAltText("Photo by Pratik Patel on Unsplash")
	).not.toBeInTheDocument();

	// leftArrow is missing when on the 1st element
	expect(queryByTestId("left-arrow")).toHaveClass("Carousel-hidden");
});
