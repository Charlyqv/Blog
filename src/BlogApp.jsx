import { Provider } from "react-redux"
import { BlogPage } from "./blog/pages/BlogPage"
import { AppTheme } from "./theme"
import { store } from "./store";

export const BlogApp = () => {
  return (
    <Provider store={ store }>
      <AppTheme>
        <BlogPage/>
      </AppTheme>
    </Provider>
  )
}
