import React, { useState } from "react";
import "./Carousel.css";
import image1 from "./image1.jpg";
import image2 from "./image2.jpg";
import image3 from "./image3.jpg";
import Card from "./Card";

function Carousel(props) {
	const [cardIdx, setCardIdx] = useState(0);
	const card = props.cardData[cardIdx];
	const total = props.cardData.length;
	const [rightArrowClass, setRightArrowClass] = useState("");
	const [leftArrowClass, setLeftArrowClass] = useState("Carousel-hidden");
	const goForward = () => {
		let idx = cardIdx;
		setCardIdx(cardIdx + 1);
		setLeftArrowClass("");
		if (idx + 1 === props.cardData.length - 1) {
			setRightArrowClass("Carousel-hidden");
		}
	};
	const goBackward = () => {
		let idx = cardIdx;
		setCardIdx(cardIdx - 1);
		setRightArrowClass("");
		if (idx - 1 === 0) {
			setLeftArrowClass("Carousel-hidden");
		}
	};

	return (
		<div className="Carousel">
			<h1>{props.title}</h1>
			<div className="Carousel-main">
				<i
					className={`fas fa-chevron-circle-left fa-2x ${leftArrowClass}`}
					onClick={goBackward}
					data-testid="left-arrow"
				/>
				<Card
					caption={card.caption}
					src={card.src}
					currNum={cardIdx + 1}
					totalNum={total}
				/>
				<i
					className={`fas fa-chevron-circle-right fa-2x ${rightArrowClass}`}
					onClick={goForward}
					data-testid="right-arrow"
				/>
			</div>
		</div>
	);
}

Carousel.defaultProps = {
	cardData: [
		{
			src: image1,
			caption: "Photo by Richard Pasquarella on Unsplash",
		},
		{
			src: image2,
			caption: "Photo by Pratik Patel on Unsplash",
		},
		{
			src: image3,
			caption: "Photo by Josh Post on Unsplash",
		},
	],
	title: "Shells from far away beaches.",
};

export default Carousel;
