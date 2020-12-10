import React, { useState, useEffect } from "react";
import LikeButton from "./likeButton";
import shortid from "shortid";
import LikeCounter from "./LikeCounter";
import UserCard from "./UserCard";
import ShareButton from "./ShareButton";
import LoadingIndicator from "./LoadingIndicator";
import {
  firestore,
  incrementLikes,
  checkIfUserLikedList,
  addUserToLikedList,
  getUserDocument,
  getListAuthor,
  decrementLikes,
  removeListFromUserLikedList,
} from "../../firebase/firebase";
import moment from "moment";

const ViewListFunc = (props) => {
  const [data, setData] = useState({});
  const [listId, setListId] = useState("");
  const [itemArray, setItemArray] = useState([]);
  const [userLiked, setUserLiked] = useState(false);
  const [author, setAuthor] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!props.match.params.id) {
      window.location = "/not-found";
    }
    let listId = props.match.params.id;
    setListId(listId);
    const userId = localStorage.getItem("uid");

    const docRef = firestore.collection("lists").doc(listId);
    const unsub = docRef.onSnapshot((snap) => {
      setData(snap.data());
    });

    const initList = async () => {
      try {
        const liked = await checkIfUserLikedList(listId, userId);
        setUserLiked(liked);
        const author = await getListAuthor(listId);
        const response = await getUserDocument(author);
        setAuthor(response);
        setLoading(false);
      } catch (error) {
        console.error(error);
        window.location = "/not-found";
      }
    };
    initList();
    return unsub;
  }, []);

  useEffect(() => {
    const mapDataToArray = () => {
      const itemArr = [];
      for (let i = 1; i <= 10; i++) {
        itemArr.push(data["item" + i]);
      }
      setItemArray(itemArr);
    };
    mapDataToArray();
  }, [data]);

  const handleButtonClick = async (event) => {
    try {
      if (userLiked) {
        setUserLiked(!userLiked);
        await decrementLikes(data.id);
        await removeListFromUserLikedList(data.id, props.user.uid);
      } else {
        setUserLiked(!userLiked);
        await incrementLikes(data.id);
        await addUserToLikedList(data.id, props.user.uid);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <React.Fragment>
      {!loading ? (
        <section className="">
          <div className="container d-flex flex-column px-4">
            <h2 className="title text-center p-4">{data.title}</h2>
            <div className="row card flex-md-row mb-3 h-md-250 shadow p-4">
              <div className="col col-sm">
                <div className="">
                  {data.image === "" ? (
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/roadtripper-fc6cc.appspot.com/o/images%2Fstatic%2Fmountain.jpg?alt=media&token=233e6bd4-0336-47da-9d73-5e75a282994f"
                      alt=""
                      className="cover"
                    ></img>
                  ) : (
                    <img src={data.image} alt="" className="cover"></img>
                  )}
                </div>
                <div className="d-flex align-items-center pt-2">
                  <h4 className="mt-1 pb-0 lead flex-grow-1">
                    {data.destination}
                  </h4>
                  {props.user ? (
                    <React.Fragment>
                      <LikeCounter likes={data.likedAmount} />
                      {data && (
                        <LikeButton
                          handleClick={handleButtonClick}
                          enabled={userLiked}
                        ></LikeButton>
                      )}
                      <ShareButton />
                    </React.Fragment>
                  ) : (
                    <React.Fragment>
                      <LikeCounter likes={data.likedAmount} />
                      <ShareButton />
                    </React.Fragment>
                  )}
                </div>
                <hr className="m-1 mb-0" />
                <UserCard height="50rem" width="50rem" data={author} />
                <p className="p-1">{data.description}</p>
                <p className="text-muted">
                  {!loading &&
                    `Created:  ${moment
                      .unix(data.publishDate.seconds)
                      .fromNow()}`}
                </p>
              </div>
              <div className="col col-sm">
                <table className="table table-viewlist table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="text-center" scope="col">
                        #
                      </th>
                      <th scope="col">Item</th>
                    </tr>
                  </thead>
                  <tbody>
                    {itemArray.map((item, index) => (
                      <tr key={item + shortid.generate()}>
                        <th className="text-center" scope="row">
                          {index + 1}
                        </th>
                        <td>{item}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <div className="d-flex h-100 justify-content-center align-items-center">
          <LoadingIndicator />
        </div>
      )}
    </React.Fragment>
  );
};

export default ViewListFunc;
