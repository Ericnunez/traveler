import React, { useState, useEffect } from "react";
import imagePlaceholder from "../../images/road.jpg";
import LikeButton from "./likeButton";
import shortid from "shortid";
import LikeCounter from "./LikeCounter";
import {
  firestore,
  incrementLikes,
  checkIfUserLikedList,
  addUserToLikedList,
  getUserDocument,
  decrementLikes,
  removeListFromUserLikedList,
} from "../../firebase/firebase";
import UserCard from "./UserCard";
import ShareButton from "./ShareButton";

const ViewListFunc = (props) => {
  const [data, setData] = useState({});
  const [listId, setListId] = useState("");
  const [itemArray, setItemArray] = useState([]);
  const [userLiked, setUserLiked] = useState(false);
  const [author, setAuthor] = useState("");
  const [authorEmail, setAuthorEmail] = useState("");

  useEffect(() => {
    let listId = "";
    if (!props.match.params.id) {
      window.location = "/not-found";
    }
    listId = props.match.params.id;
    setListId(listId);
    const docRef = firestore.collection("lists").doc(listId);

    const checkIfListExists = async () => {
      const response = await docRef
        .get()
        .then((doc) => {
          if (!doc.exists) {
            console.log("No such document check!");
            window.location = "/not-found";
          }
        })
        .catch((error) => {
          console.log("Error getting document:", error);
        });
    };
    checkIfListExists();
    const unsub = docRef.onSnapshot((snap) => {
      setData(snap.data());
    });

    return () => unsub();
  }, []);

  useEffect(() => {
    const userId = localStorage.getItem("uid");
    const check = async (userId) => {
      await checkIfUserLikedList(data.id, userId)
        .then((res) => {
          setUserLiked(res);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    check(userId);
  }, []);

  useEffect(() => {
    const author = data.uid;
    const getUserDoc = async (author) => {
      await getUserDocument(author)
        .then((response) => {
          setAuthor(response.displayName);
          setAuthorEmail(response.email);
        })
        .catch((error) => {
          console.log(
            "There was an error with the API call getting author details",
            error
          );
        });
    };

    getUserDoc(author);
  }, [data]);

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

  const handleButtonClick = (event) => {
    if (userLiked) {
      decrementLikes(data.id);
      removeListFromUserLikedList(data.id, props.user.uid);
      setUserLiked(false);
    } else {
      incrementLikes(data.id);
      addUserToLikedList(data.id, props.user.uid);
      setUserLiked(true);
    }
  };

  return (
    <React.Fragment>
      {data && (
        <section className="">
          <div className="container d-flex flex-column px-4">
            <h2 className="title text-center p-4">{data.title}</h2>
            <div className="row card flex-md-row mb-3 h-md-250 shadow p-4">
              <div className="col col-sm">
                <div className="">
                  {data.image === "" ? (
                    <img src={imagePlaceholder} alt="" className="cover"></img>
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
                          status={data.liked}
                          enabled={!userLiked}
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
                {author && (
                  <UserCard
                    height="40rem"
                    width="40rem"
                    displayName={author}
                    email={authorEmail}
                  />
                )}

                <p className="p-1">{data.description}</p>
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
      )}
    </React.Fragment>
  );
};

export default ViewListFunc;
