const userServices = require("../services/user.services");
// const axios = require("axios");

const saveUser = async (req, res) => {
  const { username } = req.params;

  const exist = await isUserExist(username);
  if (exist.length) {
    return res
      .status(200)
      .json({ message: "user already saved in database", user: exist[0] });
  }

  const user = await userServices.register(req.body);
  res.status(201).json({ message: "User registered successfully", user });
};

const findMutualFollowers = async (req, res) => {
  try {
    const { username } = req.params;

    const exist = await isUserExist(username);
    if (!exist.length) {
      throw new Error("user don't exist");
    }

    const result = await userServices.search({ username: username });
    const friends = result[0].friends;

    return friends.length
      ? res.status(200).json({ message: "mutual friends found ", friends })
      : res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const searchUser = async (req, res) => {
  try {
    // const filterSearch = req.body;
    let filter = {};
    Object.keys(req.body).forEach((key) => {
      // Assigning key-value pairs to the filter object
      filter[key] = req.body[key];
    });
    // console.log(filter);
    const result = await userServices.search(filter);

    res.status(200).json({ message: "search result", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const exist = await isUserExist(username);
    if (!exist.length) {
      throw new Error("user don't exist");
    }

    const { username } = req.params;
    const data = { availability: false };
    const result = await userServices.deleteUser(username, data);
    res.status(200).json({ message: `${username} data deleted`, result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const exist = await isUserExist(username);
    if (!exist.length) {
      throw new Error("user don't exist");
    }

    const update = req.body;
    const { username } = req.params;
    const result = await userServices.updateUser(username, update);
    res.status(200).json({ message: `updated user`, result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const listUser = async (req, res) => {
  try {
    const { sortBy } = req.query;

    const result = await userServices.fetchAll(sortBy);
    res.status(200).json({ message: "fetched all user", result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

async function isUserExist(username) {
  const exist = await userServices.search({
    username: username.toLowerCase(),
  });
  return exist;
}

module.exports = {
  listUser,
  updateUser,
  deleteUser,
  searchUser,
  findMutualFollowers,
  saveUser,
};

/* const saveUser = async (req, res) => {
  try {
    const { username } = req.params;

    const exist = await isUserExist(username);
    if (exist.length) {
      // console.log(exist);
      // return res
      //   .status(409)
      //   .json({ message: "user already exist,try another username" }); // 409 conflict
      return res
        .status(200)
        .json({ message: "User already registered ", user: exist[0] });
      //!returning user even if it is already register
    }

    const API = "https://api.github.com/users";
    const resAPi = await axios.get(`${API}/${username}`);

    if (resAPi.status !== 200) {
      throw new Error("Failed to fetch user data");
    }

    const { followersData, followingData, friendsData } = await getFollowers(
      username
    );

    const userData = {
      username: resAPi.data.login.toLowerCase(), // needed for search op.
      ID: resAPi.data.id,
      avatar_URL: resAPi.data.avatar_url,
      type: resAPi.data.type,
      name: resAPi.data.name,
      company: resAPi.data.name,
      blog: resAPi.data.blog,
      location: resAPi.data.location,
      email: resAPi.data.email,
      bio: resAPi.data.bio,
      public_repos: resAPi.data.public_repos,
      public_gists: resAPi.data.public_gists, // converted string into number in models automatically
      followers: resAPi.data.followers,
      following: resAPi.data.following,
      friends: friendsData.length,
      availability: true,
      created_at: resAPi.data.created_at,
      updated_at: resAPi.data.updated_at,
      followersArray: followersData,
      followingArray: followingData,
      friendsArray: friendsData,
      repoUrl: resAPi.data.repos_url,
    };

    const user = await userServices.register(userData);
    res.status(201).json({ message: "User registered successfully", user }); // change it accordingly
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
 */

/* 
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
 */
