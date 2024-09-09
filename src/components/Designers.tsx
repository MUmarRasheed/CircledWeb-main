import React, { useEffect, useState } from "react";
import Pagination from "./common/Pagination";
import UsersWrapper from "./common/UsersWrapper";
import { getUsers } from "../services/auth";
import Loading from "./common/Loading";
import { UserBrief } from "./common/UserContainer";
import { useSearchParams } from "react-router-dom";
import Brands from "../TextPages/Brands";
import News from "../TextPages/News";

function Designers() {
  const [users, setUsers] = useState<UserBrief[]>([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [fetch, setFetch] = useState(false);
  const [config, setConfig] = useState({
    totalDocs: 0,
    totalPages: 0,
    limit: 10,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!fetch) return;

    async function fetchUsers() {
      setLoading(true);
      const response = await getUsers(page);
      const data = response.data.data;
      setUsers(data.docs);
      setConfig({
        totalDocs: data.totalDocs,
        totalPages: data.totalPages,
        limit: data.limit,
      });
      setLoading(false);
      setFetch(false);
    }

    fetchUsers();
  }, [fetch]);

  useEffect(() => {
    const _page = searchParams.get("page");
    setPage(parseInt(_page || "1"));
    setFetch(true);
  }, [searchParams]);

  function changePage(page: number) {
    // var newurl =
    //   window.location.protocol +
    //   "//" +
    //   window.location.host +
    //   window.location.pathname +
    //   "?page=" +
    //   page;
    // window.history.pushState({ path: newurl }, "", newurl);
    setSearchParams({ page: page } as any);
  }

  if (loading) return <Loading />;

  return (
    <div id="designers-page">
      <h1 className="title center advent">Trending Designers</h1>
      <p className="center max-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero harum
        explicabo ex. Culpa mollitia, excepturi laudantium tempore sequi vitae
        illum provident corporis distinctio vero voluptatem illo numquam
        doloribus cupiditate deserunt?
        <br />
        <br />
        <br />
      </p>
      <div className="users-containers">
        <UsersWrapper users={users}></UsersWrapper>
        <Pagination
          currentPage={page}
          totalDocs={config.totalDocs}
          totalPages={config.totalPages}
          onPageChange={changePage}
          setSize={config.limit}
        ></Pagination>
      </div>
      <Brands></Brands>
      <News n={3}></News>
    </div>
  );
}

export default Designers;
