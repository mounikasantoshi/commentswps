export const getDevBlogsComments = async(e, index)=> {
 
  let blogName = e.blog_name;
  let postSlug = e.post_slug;  
  const url = `https://www.visualstudio-staging.com/${blogName}/graphql`;
  //const url = `https://localhost/${blogName}/graphql`;
  const headers = { 
	'Accept': 'application/json',
    'Content-Type': 'application/json',
  };
	const query = {
		query:`query MyQuery{
			post(id: "${postSlug}", idType: SLUG) {
				comments(where: {parentIn: "", order: DESC}, first: ${index}) {
				nodes {
					content
					date
					databaseId
					replies {
					nodes {
						content
						date
						id
						databaseId
						parentId
						replies {
						nodes {
							content
							id
							date
							databaseId
							parentId
							author {
							node {
								avatar {
								url
								width
								height
								}
							}
							}
							replies {
							nodes {
								author {
								node {
									avatar {
									width
									url
									height
									}
								}
								}
								content
								date
								id
								databaseId
								parentId
								replies {
								nodes {
									author {
									node {
										avatar {
										url
										width
										height
										}
									}
									}
									content
									date
									id
									databaseId
									parentId
									replies {
									nodes {
										author {
										node {
											avatar {
											url
											width
											height
											}
										}
										}
										content
										date
										id
										databaseId
										parentId
									}
									}
								}
								}
							}
							}
						}
						}
						author {
						node {
							avatar {
							url
							width
							height
							}
						}
						}
					}
					}
					id
					author {
					node {
						avatar {
						url
						width
						height
						}
					}
					}
				}
					pageInfo {
						endCursor
						hasNextPage
						hasPreviousPage
						startCursor
					}
				}
				commentCount
			}
			}`
    };
    const res = await fetch(url, {
      headers,
      method: 'POST',
      body: JSON.stringify(query)
    })
    
	const resJson = await res.json();
	//const post = resJson.data;
	console.log("posts comments", resJson.data.post);
	return resJson.data;
}

export const createComment = async (text, parentId = 0, e) => {
	let blogName = e.blog_name;
	let postId = e.post_id;
	const url = `https://www.visualstudio-staging.com/${blogName}/graphql`;
	//const url = `https://localhost/${blogName}/graphql`;
	const headers = {
		'Content-Type': 'application/json',
	};

	const commentQuery = {
		query: `mutation CREATE_COMMENT {
			createComment(
				input: {
					commentOn: ${postId},
					parent: "${parentId}"
					content: "${text}", 
					author: "nasawa", 
					authorEmail: "v-nasawa@microsoft.com"
				}
			) {
				success
				comment {
				id
				content
				author {
					node {
					name
					}
				}
				}
			}
		}`
	};

	const res = await fetch(url, {
		headers,
		method: 'POST',
		body: JSON.stringify(commentQuery)
	});

	const resJson = await res.json();

	console.log("resJson", resJson);
	//return;
	if(resJson.data.createComment.comment !== null && resJson.data.createComment.success) {
		let data = {
			id: resJson.data.createComment.comment.id,
			author: resJson.data.createComment.comment.author,
			authorEmail: 'v-nasawa@microsoft.com',
			parent: `"${parentId}"`,
			content: resJson.data.createComment.comment.content,
		}
		return data;
	}
};

export const updateComment = async (text, commentId, e) => {
	let blogName = e.blog_name;
	let postId = e.post_id;
	//const url = `https://www.visualstudio-staging.com/${blogName}/graphql`;
	//const url = `https://localhost/${blogName}/graphql`;
	const url = `https://www.visualstudio-staging.com/${blogName}/wp-json/wp/v2/comments/${commentId}`;
	//const url = `https://localhost/${blogName}/wp-json/wp/v2/comments/${commentId}`;
	const headers = {
		'Content-Type': 'application/json',
	};

	// const commentQuery = {
	// 	query: `mutation {
	// 		updateComment(input: {
	// 			id: ${commentId}, 
	// 			content: "${text}"
	// 		}) {
	// 			comment {
	// 			id
	// 			content
	// 			}
	// 		}
	// 	}`
	// };

	// const commentQuery = {
	// 	query: `mutation UPDATE_COMMENT {
	// 		updateComment(
	// 			input: {
	// 				commentOn: ${postId},
	// 				id: "${commentId}",
	// 				content: "update text", 
	// 				author: "nasawa", 
	// 				authorEmail: "v-nasawa@microsoft.com"
	// 			}
	// 		) {
	// 			success
	// 			comment {
	// 			id
	// 			content
	// 			author {
	// 				node {
	// 				name
	// 				}
	// 			}
	// 			}
	// 		}
	// 	}`
	// };

		// post: 241221,
		// id: 28837,
	const bodyParams  = `{
		post: ${postId},
		id: "${commentId}",
		content: "${text}", 
		author_user_agent: "nasawa", 
		author_email: "v-nasawa@microsoft.com"
	}`;

	try {
		const res = await fetch(url, {
			mode: 'no-cors',
			headers,
			method: 'POST',
			body: JSON.stringify(bodyParams)
		});

		//console.log("response", res)
		const resJson = await res.json();
		return { resJson };
	} catch (error) {
		return(error);
	}
};

export const deleteComment = async () => {
  return {};
};

export const getComments = async () => { 
	return [
	  {
		id: "1",
		body: "First comment",
		username: "Jack",
		userId: "1",
		parentId: null,
		createdAt: "2021-08-16T23:00:33.010+02:00",
	  },
	  {
		id: "2",
		body: "Second comment",
		username: "John",
		userId: "2",
		parentId: null,
		createdAt: "2021-08-16T23:00:33.010+02:00",
	  },
	  {
		id: "3",
		body: "First comment first child",
		username: "John",
		userId: "2",
		parentId: "1",
		createdAt: "2021-08-16T23:00:33.010+02:00",
	  },
	  {
		id: "4",
		body: "Second comment second child",
		username: "John",
		userId: "2",
		parentId: "2",
		createdAt: "2021-08-16T23:00:33.010+02:00",
	  },
	];
  };  