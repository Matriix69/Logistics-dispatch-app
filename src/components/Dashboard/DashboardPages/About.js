import "../../../css/About.css";

function About() {
	return (
		<div className="card">
			<div className="cardbody">
				<div className="aboutus-page">
					<section>
						<p className="text text-medium ">We are GreensEx!</p>
						<p className="text text-regular ">
							GreensEx logistics is a value driven technology
							company based in Port Harcourt, Rivers State. We
							creating a change by connecting ideas and providing
							quality service delivery to our amazing clients. At
							GreensEX every customer matters, and our
							professional team are trained to ensure you get a
							smooth experience.
						</p>
						<p className="text text-regular ">
							The mission of GreensEx logistics is become a
							world-class brand using Information technology to
							bridge the gap and create value for our customers.
							Our trusted team is poised to ensure our safety
							standard is a priority. No matter what, we will
							always put you first.
						</p>
					</section>
					<section>
						<p className="text text-medium ">Our Values!</p>
						<ul>
							<li>
								<p className="text text-regular value-title">
									Accountability
								</p>
							</li>
							<li>
								<p className="text text-regular value-title">
									Responsiveness
								</p>
							</li>
							<li>
								<p className="text text-regular value-title">
									Trust
								</p>
							</li>
							<li>
								<p className="text text-regular value-title">
									{" "}
									Positive impact
								</p>
							</li>
							<li>
								<p className="text text-regular value-title">
									Upholding the highest ethical standards
								</p>
							</li>
						</ul>
					</section>
				</div>
			</div>
		</div>
	);
}

export default About;
