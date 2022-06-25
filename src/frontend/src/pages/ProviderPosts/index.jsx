export default function ProviderPosts() {

    function handleClick() {
        alert('abc');
    }

    return (
        <div className="mdui-table-fluid">
            <table className="mdui-table mdui-table-hoverable">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Username</th>
                    </tr>
                </thead>
                <tbody>
                    <tr onClick={handleClick}>
                        <td>1</td>
                        <td>Mark</td>
                        <td>Otto</td>
                        <td>@mdo</td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Jacob</td>
                        <td>Thornton</td>
                        <td>@fat</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Larry the Bird</td>
                        <td></td>
                        <td>@twitter</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}