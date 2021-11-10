import { useState, useEffect, useRef } from "react";
import { slides } from "../../utils/utils";
import { useSwipeable } from "react-swipeable";
import { useAuth } from "../../context/AuthContext";
import "../../css/slide.css";
import { useHistory, Link } from "react-router-dom";
import classnames from "classnames";

export default function Slide2() {
	const [pageLoaded, setPageLoaded] = useState(false);
	const [index, setIndex] = useState(0);
	const timeoutRef = useRef(null);
	const delay = 6000;
	const prevSlide = index === 0 ? slides.length - 1 : index - 1;
	const nextSlide = index === slides.length - 1 ? 0 : index + 1;

	const history = useHistory();
	const { currentUser } = useAuth();

	useEffect(() => {
		let timeOut = setTimeout(() => {
			setPageLoaded(true);
		}, 50);
		return () => {
			clearTimeout(timeOut);
		};
	}, []);

	function goto() {
		if (currentUser && currentUser.admin === true) {
			history.push("/dashboard/admin");
		} else if (currentUser && currentUser.emailVerified === true) {
			history.push("/dashboard");
		} else {
			history.push("/business");
		}
	}

	useEffect(() => {
		resetTimeout();
		timeoutRef.current = setTimeout(
			() =>
				setIndex((prevIndex) =>
					prevIndex === slides.length - 1 ? 0 : prevIndex + 1
				),
			delay
		);
		return () => {
			resetTimeout();
		};
	}, [index]);

	function resetTimeout() {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
	}

	const handlers = useSwipeable({
		onSwipedLeft: (eventData) => setIndex(nextSlide),
		onSwipedRight: (eventData) => setIndex(prevSlide),
		onSwipedUp: (eventData) => setIndex(nextSlide),
		onSwipedDown: (eventData) => setIndex(prevSlide),
	});

	return (
		<div
			className={classnames({
				"home-wrapper": true,
				"show-page": pageLoaded,
			})}
		>
			<div className="slideshow">
				<div className="slideshowSlider" {...handlers}>
					{slides.map((slides, idx) => (
						<div
							className={"slide " + (idx === index ? "show" : "")}
							key={idx}
						>
							<img src={slides.image} alt={slides.title} />
							<p className="text text-title text-dark">
								{slides.title}
							</p>
							<p className="text text-regular text-subdark">
								{slides.description}
							</p>
						</div>
					))}
				</div>

				<div className="slideshowDots">
					{slides.map((_, idx) => (
						<div
							key={idx}
							className={
								"slideshowDot " +
								(index === idx ? "btnActive" : "")
							}
							onClick={() => {
								setIndex(idx);
							}}
						></div>
					))}
				</div>
			</div>

			<div className="button">
				{/* <Link onClick={() => history.push("/request-dispatch")} className="btn-primary text text-regular" type="button">Personal Deliveries</Link> */}
				<Link
					to="/request-dispatch"
					className="btn-primary text text-regular"
					type="button"
				>
					Personal Deliveries
				</Link>
				<button
					onClick={() => goto()}
					className="btn-inverse text text-regular"
					type="button"
				>
					Business Deliveries
				</button>
			</div>

			{/* <p style={{textAlign: "center", margin:"2rem 0", fontSize:"14px", fontWeight:"400" }}><a style={{color:"#000000"}} href="https://twitter.com/isaacchukwuka_" >Made by Isaac Chukwuka(Matrix)</a></p> */}
		</div>
	);
}
