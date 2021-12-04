import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import bg from "./img/bg.jpg";

const Subscription = () => {
	let navigate = useNavigate();
	const [subs, setsubs] = useState([]);

	useEffect(() => {
		let val = localStorage.getItem("gid");
		if (!(val === null)) {
			val = val.split(",");
			axios
				.post("http://127.0.0.1:8000/api/check/", {
					email: val[0],
					password: val[1],
				})
				.then((data) => {
					if (data.status === 200) {
						if (data.data.Data === "no") {
							localStorage.removeItem("gid");
							navigate("/login");
						} else {
							axios
								.post("http://127.0.0.1:8000/subslist2/", {
									email: localStorage
										.getItem("gid")
										.split(",")[0],
								})
								.then((data) => {
									setsubs(data.data.Data);
								})
								.catch((err) => {
									console.log(err);
								});
						}
					} else if (data.status === 404) {
						localStorage.removeItem("gid");
						navigate("/login");
					} else {
						alert("Some error occured!");
						window.location.reload();
					}
				})
				.catch((err) => {
					console.log(err);
				});
		} else {
			navigate("/login");
		}
	}, []);

	const HandleClick = (title, bought) => {
		if (bought === "yes") {
			bought = "no";
		} else {
			bought = "yes";
		}
		axios
			.post("http://127.0.0.1:8000/api/update/", {
				title: title,
				email: localStorage.getItem("gid").split(",")[0],
				condition: bought,
			})
			.then((data) => {
				window.location.reload();
			})
			.catch((err) => {
				console.log(err);
				alert("Some error occurred! Payment was not finished!");
			});
	};

	const HandleLogout = () => {
		localStorage.removeItem("gid");
		navigate("/login");
	};

	let cal = (le) => {
		if (le % 4 === 0) {
			return le / 4;
		} else {
			let no = le / 4;
			return parseInt(no.toString().split(".")[0]) + 1;
		}
	};

	return (
		<Screen>
			<TitleBar>
				<P2>Events Happening Now</P2>
				<But2 onClick={HandleLogout}>Logout</But2>
			</TitleBar>
			<Remain>
				{subs.length === 0 ? (
					<CircleLoader />
				) : (
					Array(cal(subs.length))
						.fill(1)
						.map((element, i) => {
							return (
								<Grid>
									<Box>
										<Title>
											<P>
												{subs[
													i * 4
												].title.toUpperCase()}
											</P>
										</Title>
										<Imgbx>
											<Img
												src={
													subs[i * 4].image === ""
														? bg
														: subs[i * 4].image
												}
											></Img>
										</Imgbx>
										<Det>
											<P>{subs[i * 4].detail}</P>
											<But
												onClick={() =>
													HandleClick(
														subs[i * 4].title,
														subs[i * 4].bought
													)
												}
											>
												{subs[i * 4].bought ===
												"yes" ? (
													<p>PAID</p>
												) : (
													<p>
														Rs.
														{subs[i * 4].price}
													</p>
												)}
											</But>
										</Det>
									</Box>
									{i * 4 + 1 < subs.length ? (
										<>
											<Box>
												<Title>
													<P>
														{subs[
															i * 4 + 1
														].title.toUpperCase()}
													</P>
												</Title>
												<Imgbx>
													<Img
														src={
															subs[i * 4 + 1]
																.image === ""
																? bg
																: subs[
																		i * 4 +
																			1
																  ].image
														}
													></Img>
												</Imgbx>
												<Det>
													<P>
														{subs[i * 4 + 1].detail}
													</P>
													<But
														onClick={() =>
															HandleClick(
																subs[i * 4 + 1]
																	.title,
																subs[i * 4 + 1]
																	.bought
															)
														}
													>
														{subs[i * 4 + 1]
															.bought ===
														"yes" ? (
															<p>PAID</p>
														) : (
															<p>
																Rs.
																{
																	subs[
																		i * 4 +
																			1
																	].price
																}
															</p>
														)}
													</But>
												</Det>
											</Box>

											{i * 4 + 2 < subs.length ? (
												<>
													<Box>
														<Title>
															<P>
																{subs[
																	i * 4 + 2
																].title.toUpperCase()}
															</P>
														</Title>
														<Imgbx>
															<Img
																src={
																	subs[
																		i * 4 +
																			2
																	].image ===
																	""
																		? bg
																		: subs[
																				i *
																					4 +
																					2
																		  ]
																				.image
																}
															></Img>
														</Imgbx>
														<Det>
															<P>
																{
																	subs[
																		i * 4 +
																			2
																	].detail
																}
															</P>
															<But
																onClick={() =>
																	HandleClick(
																		subs[
																			i *
																				4 +
																				2
																		].title,
																		subs[
																			i *
																				4 +
																				2
																		].bought
																	)
																}
															>
																{subs[i * 4 + 2]
																	.bought ===
																"yes" ? (
																	<p>PAID</p>
																) : (
																	<p>
																		Rs.
																		{
																			subs[
																				i *
																					4 +
																					2
																			]
																				.price
																		}
																	</p>
																)}
															</But>
														</Det>
													</Box>
													{i * 4 + 3 < subs.length ? (
														<Box>
															<Title>
																<P>
																	{subs[
																		i * 4 +
																			3
																	].title.toUpperCase()}
																</P>
															</Title>
															<Imgbx>
																<Img
																	src={
																		subs[
																			i *
																				4 +
																				3
																		]
																			.image ===
																		""
																			? bg
																			: subs[
																					i *
																						4 +
																						3
																			  ]
																					.image
																	}
																></Img>
															</Imgbx>
															<Det>
																<P>
																	{
																		subs[
																			i *
																				4 +
																				3
																		].detail
																	}
																</P>
																<But
																	onClick={() =>
																		HandleClick(
																			subs[
																				i *
																					4 +
																					3
																			]
																				.title,
																			subs[
																				i *
																					4 +
																					3
																			]
																				.bought
																		)
																	}
																>
																	{subs[
																		i * 4 +
																			3
																	].bought ===
																	"yes" ? (
																		<p>
																			PAID
																		</p>
																	) : (
																		<p>
																			Rs.
																			{
																				subs[
																					i *
																						4 +
																						3
																				]
																					.price
																			}
																		</p>
																	)}
																</But>
															</Det>
														</Box>
													) : (
														console.log("hi")
													)}
												</>
											) : (
												console.log("hi")
											)}
										</>
									) : (
										console.log("hi")
									)}
								</Grid>
							);
						})
				)}
			</Remain>
		</Screen>
	);
};

const Grid = styled.div`
	height: 350px;
	width: 100%;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-around;
`;

const TitleBar = styled.div`
	width: 100%;
	height: 75px;
	background-color: rgb(18, 18, 18);
	display: flex;
	justify-content: space-around;
	align-items: center;
`;

const Remain = styled.div`
	min-height: calc(100vh - 75px);
	width: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

const P2 = styled.p`
	text-align: center;
	color: white;
	font-family: "Roboto Mono", monospace;
	font-size: 45px;
`;

const P = styled.p`
	text-align: center;
`;

const But2 = styled.div`
	height: 40px;
	width: 80px;
	background-color: rgb(222, 138, 216);
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid rgb(18, 18, 18);
	&:hover {
		background-color: transparent;
		border: 1px solid rgb(0, 98, 204);
		cursor: pointer;
		color: white;
	}
`;

const But = styled.div`
	height: 40px;
	width: 80px;
	background-color: rgb(222, 138, 216);
	border-radius: 10px;
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid rgb(138, 138, 138);
	&:hover {
		background-color: transparent;
		border: 1px solid rgb(0, 98, 204);
		cursor: pointer;
		color: black;
	}
`;

const Title = styled.div`
	height: 50px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Imgbx = styled.div`
	height: 165px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Img = styled.img`
	height: 155px;
	width: 90%;
	display: flex;
	align-items: center;
	justify-content: center;
`;

const Det = styled.div`
	height: 100px;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-around;
	flex-direction: column;
`;

const Box = styled.div`
	height: 315px;
	width: 250px;
	background-color: rgb(138, 138, 138);
	border: 1px solid black;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	font-family: "Roboto Mono", monospace;
`;

const spin = keyframes`
 0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const CircleLoader = styled.div`
	border: 16px solid #f3f3f3;
	border-radius: 50%;
	border-top: 16px solid #3498db;
	width: 120px;
	height: 120px;
	animation: ${spin} 2s linear infinite;
`;

const Screen = styled.div`
	width: 100%;
	min-height: 100vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
`;

export default Subscription;
