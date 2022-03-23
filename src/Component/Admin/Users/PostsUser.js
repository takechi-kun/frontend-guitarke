import React from "react";

function PostsUser({ currentPostsUsers }) {
  return (
    <div className="flex flex-col ">
      <div className="sm:-mx-6 lg:-mx-8">
        <div className="min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full text-center">
              <thead className="border-b bg-gray-800">
                <tr>
                  <th className="text-sm font-medium text-white px-3 py-2">
                    User_Id
                  </th>
                  <th className="text-sm font-medium text-white px-3 py-2">
                    Email
                  </th>
                  <th className="text-sm font-medium text-white px-3 py-2">
                    Username
                  </th>
                  <th className="text-sm font-medium text-white px-3 py-2">
                    Verify
                  </th>
                </tr>
              </thead>
              {currentPostsUsers.map((user, index) => {
                return (
                  <tbody key={index}>
                    <tr className="bg-white border-b">
                      <td className="px-2 py-1 whitespace-nowrap text-sm font-medium text-gray-900">
                        {user.user_id}
                      </td>
                      <td className="border-l text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap">
                        {user.email}
                      </td>
                      <td className="border-l text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap">
                        {user.username}
                      </td>
                      <td className="border-l text-sm text-gray-900 font-light px-2 py-2 whitespace-nowrap">
                        {user.verify}
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostsUser;