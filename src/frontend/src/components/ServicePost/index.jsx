export default function ServicePost(props) {
    const post = props.post;
    return(
        <div className="mdui-card mdui-hoverable">

            <div className="mdui-card-media">
                <img src="https://w.wallhaven.cc/full/j8/wallhaven-j8kgpw.jpg"/>
                <div className="mdui-card-media-covered mdui-card-media-covered-transparent">
                    <div className="mdui-card-primary">
                        <div className="mdui-card-primary-title">{post.title}</div>
                        <div className="mdui-card-primary-subtitle">{post.author_first_name} {post.author_last_name}</div>
                    </div>
                    <div className="mdui-card-content">
                        Service time: {post.start_time} - {post.end_time}<br />
                        Price: ${post.price}<br />
                        Location: {post.location}<br />
                    </div>
                </div>
            </div>
        </div>
    )
}