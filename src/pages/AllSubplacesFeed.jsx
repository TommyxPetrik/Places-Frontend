import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import Subplace from "../components/SubplacePage/Subplace";
import { useAuth } from "../components/context/AuthContext";
import SignInError from "../components/SignInSignUpPage/SignInError";

const AllSubplacesFeed = ({ cachedSubplaces, setCachedSubplaces }) => {
  const [subplaces, setSubplaces] = useState(cachedSubplaces || []);
  const [joinedSubplaces, setJoinedSubplaces] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const openModal = () => setShowModal(true);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [loadingJoined, setLoadingJoined] = useState(true);
  const location = useLocation();
  const { user } = useAuth();
  const token = user?.token;

  const fetchUserJoinedSubplaces = async () => {
    if (!token) {
      setJoinedSubplaces([]);
      setLoadingJoined(false);
      return;
    }
    try {
      const res = await fetch(
        "http://localhost:3000/users/getJoinedSublacesId",
        {
          headers: {
            "x-access-token": token,
          },
        }
      );

      if (res.ok) {
        const data = await res.json();
        setJoinedSubplaces(data);
      } else {
        setJoinedSubplaces([]);
      }
    } catch (err) {
      console.error("Error fetching joined subplaces:", err.message);
      setJoinedSubplaces([]);
    } finally {
      setLoadingJoined(false);
    }
  };

  const fetchData = async (append = false) => {
    if (!append) setLoading(true);
    setIsFetching(true);
    try {
      const res = await fetch(
        `http://localhost:3000/public/subplacefeed?page=${page}&limit=10`
      );

      if (!res.ok) throw new Error("Failed to fetch subplaces");

      const fetched = await res.json();

      const combined = append
        ? Array.from(
            new Map(
              [...subplaces, ...fetched].map((item) => [item._id, item])
            ).values()
          )
        : fetched;

      setSubplaces(combined);
      setCachedSubplaces(combined);

      if (fetched.length < 10) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching subplaces:", err.message);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchUserJoinedSubplaces();
    if (!cachedSubplaces || cachedSubplaces.length === 0) {
      fetchData();
    } else {
      setLoading(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    if (token) {
      fetchUserJoinedSubplaces();
    }
  }, [token]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        if (hasMore && !loading && !isFetching) {
          setIsFetching(true);
          setPage((prev) => prev + 1);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading, isFetching]);

  useEffect(() => {
    if (page > 1) {
      fetchData(true);
    }
  }, [page]);

  return (
    <div>
      {showModal && <SignInError setShowModal={setShowModal} />}
      {loading || loadingJoined ? (
        <div className="d-flex justify-content-center my-3">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        subplaces.map((sub) => (
          <Subplace
            key={sub._id}
            subplace={sub.name}
            description={sub.description}
            subplaceId={sub._id}
            questionCount={sub.questionsCount}
            time={formatDistanceToNow(new Date(sub.createdAt), {
              addSuffix: true,
            })}
            tags={sub.tags}
            joinStatus={joinedSubplaces}
            onRequireLogin={openModal}
            creator={sub.creator}
          />
        ))
      )}

      {!loading && !hasMore && (
        <div className="text-center my-3 text-white">
          <p>Žiadne ďalšie subplaces na načítanie.</p>
        </div>
      )}
    </div>
  );
};

export default AllSubplacesFeed;
