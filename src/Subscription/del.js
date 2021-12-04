{
	/* {() => {
												if (
													i * 4 + 2 <
													subs.length
												) {
													return (
														<>
															<Box>
																<Title>
																	<P>
																		{subs[
																			i *
																			4 +
																			2
																		].title.toUpperCase()}
																	</P>
																</Title>
																<Imgbx>
																	<Img
																		src={
																			subs[
																				i *
																				4 +
																				2
																			]
																				.image ===
																				""
																				? subs[
																					i *
																					4 +
																					2
																				]
																					.image
																				: bg
																		}
																	></Img>
																</Imgbx>
																<Det>
																	<P>
																		{
																			subs[
																				i *
																				4 +
																				2
																			]
																				.detail
																		}
																	</P>
																	<But
																		onClick={() =>
																			HandleClick(
																				subs[
																					i *
																					4 +
																					2
																				]
																					.title,
																				subs[
																					i *
																					4 +
																					2
																				]
																					.bought
																			)
																		}
																	>
																		{subs[
																			i *
																			4 +
																			2
																		]
																			.bought ===
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
																						2
																					]
																						.price
																				}
																			</p>
																		)}
																	</But>
																</Det>
															</Box>
															{() => {
																if (
																	i *
																	4 +
																	3 <
																	subs.length
																) {
																	return (
																		<Box>
																			<Title>
																				<P>
																					{subs[
																						i *
																						4 +
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
																							? subs[
																								i *
																								4 +
																								3
																							]
																								.image
																							: bg
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
																						]
																							.detail
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
																						i *
																						4 +
																						3
																					]
																						.bought ===
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
																	);
																}
															}}
														</>
													);
												}
											}} */
}
