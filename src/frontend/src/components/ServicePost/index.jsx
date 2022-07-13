export default function ServicePost(props) {
    const post = props.post;
    return(
        <div className="mdui-card mdui-hoverable">

            {/* <!-- 卡片的媒体内容，可以包含图片、视频等媒体内容，以及标题、副标题 --> */}
            <div className="mdui-card-media">
                <img src="https://cdn.w3cbus.com/mdui/docs~1/static/1ca4b7b2b4b2f2352aeb.jpg"/>
                <div className="mdui-card-media-covered mdui-card-media-covered-transparent">
                    {/* <!-- 卡片的标题和副标题 --> */}
                    <div className="mdui-card-primary">
                        <div className="mdui-card-primary-title">{post.title}</div>
                        <div className="mdui-card-primary-subtitle">{post.author_first_name} {post.author_last_name}</div>
                    </div>

                    {/* <!-- 卡片的内容 --> */}
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