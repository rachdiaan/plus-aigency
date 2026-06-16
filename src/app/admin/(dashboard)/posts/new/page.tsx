import PostForm from "../PostForm";

export default function NewPostPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-slate-900">New Post</h1>
            <p className="mt-1 text-sm text-slate-500">
                Write a new article. Set status to <strong>Published</strong> to make it live on the blog.
            </p>
            <div className="mt-6">
                <PostForm />
            </div>
        </div>
    );
}
