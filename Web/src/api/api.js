/* eslint-disable no-unused-vars */
import axios from "axios";

const BACKEND_ENDPOINT = "http://localhost:3000";
// const BACKEND_ENDPOINT = "https://chittychittybangbang.onrender.com";
// const BACKEND_ENDPOINT = "https://assignment-githubexplorer-server-1.onrender.com";
// const BACKEND_ENDPOINT =
//   "https://assignment-githubexplorer-server.onrender.com";

//================================>save-user or search if already exist<==============
/* 
? what we neede to show on home page: userpanel , repository , followers button to show all followers ;

*/

export const fetchuser = async (username) => {
  try {
    // if (bool == true) {
    //   const res = await axios.post(
    //     `${BACKEND_ENDPOINT}/api/check-exist/${username}`
    //   );
    //   console.log(res.status);
    //   if (res.status === 200) {
    //     //if it is already saved
    //     return { newUserData: res.data.user };
    //   }
    // }
    // console.log("in false api");

    const API = "https://api.github.com/users";

    const resApi = await axios.get(`${API}/${username}`); //github restApi

    if (resApi.status === 200 || resApi.status === 304) {
      //304 : not modified ;
      const userData = resApi.data;

      // console.log(resApi.data);

      const { followersData, followingData, friendsData } = await getFollowers(
        username
      );

      const newUserData = {
        username: userData.login.toLowerCase(), // needed for search op.
        ID: userData.id,
        avatar_URL: userData.avatar_url,
        type: userData.type,
        name: userData.name,
        company: userData.name,
        blog: userData.blog,
        location: userData.location,
        email: userData.email,
        bio: userData.bio,
        public_repos: userData.public_repos,
        public_gists: userData.public_gists, // converted string into number in models automatically
        followers: userData.followers,
        following: userData.following,
        friends: friendsData.length,
        availability: true,
        created_at: userData.created_at,
        updated_at: userData.updated_at,
        followersArray: followersData,
        followingArray: followingData,
        friendsArray: friendsData,
        repoUrl: userData.repos_url,
      };
      /* 
      const res = await axios.post(
        `${BACKEND_ENDPOINT}/api/save-user/${username}`,
        newUserData
      );
      database is not working ,giving error , check user.services for detail ;
 */
      // console.log(res); // 201 new saved ; 200 just fetched preexisting ;success

      return { newUserData };
    }

    return { newUserData: null };
  } catch (error) {
    return error;
  }
};

//====================================>
export const fetchRepoArray = async (repoUrl) => {
  try {
    const res = await axios.get(`${repoUrl}`);

    return res.data;
  } catch (error) {
    // console.error(error.message);
    return error.response;
  }
};
// fetchRepoArray("https://api.github.com/users/kiss/repos");

//==============================================>
async function getFollowers(username) {
  const res1 = await axios.get(
    `https://api.github.com/users/${username}/followers`
  );
  const res2 = await axios.get(
    `https://api.github.com/users/${username}/following`
  );

  //  *we have hardcoded these links because the "following" links provided by the api are add with some unwanted "%" that gives error;

  const found = res1.data.filter((e) =>
    res2.data.find((unit) => unit.login === e.login)
  ); // mutual connection

  return {
    followersData: res1.data,
    followingData: res2.data,
    friendsData: found,
  };
}

////=======================>
/* old way ; server was calling the api ;
export const fetchuser = async (username) => {
  try {
    const res = await axios.get(
      `${BACKEND_ENDPOINT}/api/save-user/${username}`
    );
    // console.log(res);
    return res.data;
  } catch (error) {
    return error.response;
  }
};
*/
