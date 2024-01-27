import { BlogLayout } from "../layout/BlogLayout"
import { NoteView, NothingSelectedView } from "../views";
import { AddNew } from "../components/AddNew";
import { BlogModal } from "../components";
import { useBlogStore, useUiStore } from "../../hooks";

const drawerWidth = 280;

export const BlogPage = () => {

  const { openDateModal } = useUiStore();
  const { events, setActiveEvent, startLoadingEvents } = useBlogStore();

  return (
    <>
      <BlogLayout>
        {/* <Typography>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Facilis reiciendis itaque doloremque quis fuga quibusdam officia mollitia commodi id rerum esse sapiente eligendi, nihil ullam error fugit tenetur maxime iste.</Typography> */}
        {/* <NothingSelectedView /> */}
        <NoteView />
        <BlogModal />
        <AddNew />
      </BlogLayout>
    </>
  )
}
