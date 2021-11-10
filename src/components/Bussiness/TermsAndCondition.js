import "../../css/TermsAndConnditionModal.css";

function TermsAndConnditionModal({ open, handleCloseOpen }) {
	return open ? (
		<div
			className={
				"terms-background " + (open ? "-opened-modal" : "-closed")
			}
		>
			<div className="terms-Wrapper1">
				<div className="terms-Wrapper">
					<div className="terms-header">
						<p className="text text-title">
							Our terms and conditions
						</p>
					</div>
					<div className="terms-content">
						<div className="terms-heading">
							<p>Indemnity clause</p>
						</div>
						<ul>
							<li>
								The client shall not transport or disguise for
								delivery through the company any illegal goods
								or substance as prohibibited by the laws
								(constitution) of the Federal Republic of
								Nigeria.
							</li>
							<li>
								The client further agrees that all sealed
								item(s) shall not differ from what is declared
								in the manifest of delivery.
							</li>
						</ul>
						<div className="terms-heading">
							<p>terms and conditions</p>
						</div>
						<ul>
							<li>
								Client pledges to be respectful to our staff.
								Greens365 has zero tolerance to abuse or
								violence towards staff.
							</li>
							<li>
								All Deliveries once picked up that get cancelled
								are non refundable.
							</li>
							<li>
								In cases where customers have paid and changed
								their drop-off location, 20% will be deducted
								from the actual service charge for that order
							</li>
							<li>
								All cancellations must be done via whatsapp or
								phone call.
							</li>
							<li>
								Customers will be given 5 minutes allowance of
								delay upon Greens365 rider arriving at pick up
								point, after which a penalty of N50/Min will
								commence till an item is given to the rider.
							</li>
						</ul>
					</div>
				</div>
				<div className="terms-footer-new">
					<button
						onClick={handleCloseOpen}
						className="terms-btn-primary-modal text"
					>
						close
					</button>
				</div>
			</div>
		</div>
	) : null;
}

export default TermsAndConnditionModal;
