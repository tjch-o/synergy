import LoginPage from "./(auth)/login/page";
import SignupPage from "./(auth)/signup/page";

// import CreatePostPage from "./forum/create-post/[id]/page";
// import Forum from "./forum/page";

export default function Home() {
    return (
        <div>
            {/* <CreatePostPage userId="edca2347-9260-4c15-bb6e-68ef31ea6432" /> */}
            <LoginPage />
        </div>
    );
}
