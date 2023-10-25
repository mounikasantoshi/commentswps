import React, { useEffect, useState } from 'react'

function Home() {
    const [comments, setComments] = useState([]);

    useEffect(() => {
      fetch(`http://devblogsarchiv.wpengine.com/dotnet/wp-json/wp/v2/comments?post=45783`)
        .then(response => response.json())
        .then(data => setComments(data))
        .catch(error => console.error(error));
    }, []);
  
    return (
      <div>
        <h1>Comments</h1>
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <strong>{comment.author_name}</strong>: {comment.content.rendered}
            </li>
          ))}
        </ul>
      </div>
    );
}

export default Home