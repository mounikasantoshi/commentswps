import Comments from "./comments/Comments";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    // <div>
    //   <h1>Hello DevBlogs</h1>
    //   <Comments
    //     commentsUrl="http://localhost:3004/comments"
    //     currentUserId="1"
    //   />
    // </div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Comments />}>
          <Route path="/react/components/comment/:blog_name/:post_slug/:post_id" element={<Comments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
