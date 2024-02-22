import { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { User } from 'assets/types/user';
import { SpringPage } from 'assets/types/vendor/spring';
import { requestBackend } from 'util/requests';
//devsuperior.com.br
 const Users = () => {
  const [page, setPage] = useState<SpringPage<User>>();
  useEffect(() => {
    const params: AxiosRequestConfig = {
      url: '/users',
      withCredentials: true,
      params: {
        page: 0,
        size: 12,
      },
    };
    requestBackend(params).then((response) => {
      setPage(response.data);
    });
  }, []);
  return (
    <div>
      {page?.content.map((item) => (
        <p key={item.id}>{item.email}</p>
      ))}
    </div>
  );
};
export default Users;
