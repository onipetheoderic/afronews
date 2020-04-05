import RNFetchBlob from 'rn-fetch-blob'

export async function getCategories(baseUrl) {
    try {
        let categories = await fetch(`${baseUrl}api/categories`);
        let result = await categories.json();

        categories = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function getFeeds(baseUrl, pageId) {
    try {
        let feeds = await fetch(`${baseUrl}api/posts?page=${pageId}`);
        let result = await feeds.json();
        console.log(feeds, result)

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function getTopStories(baseUrl, pageId) {
    try {
        let feeds = await fetch(`${baseUrl}api/featured?page=${pageId}`);
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function getSinglePost(baseUrl, postId) {
    try {
        let feeds = await fetch(`${baseUrl}api/post/${postId}`);
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function getSinglePostAuthed(baseUrl, postId, token) {
    try {
        let feeds = await fetch(`${baseUrl}api/post/${postId}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}


export async function doLikePost(baseUrl, formData, token) {
    try {
        let feeds = await fetch(`${baseUrl}api/likePost`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function doUnlikePost(baseUrl, formData, token) {
    try {
        let feeds = await fetch(`${baseUrl}api/unlikePost`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function doLikeComment(baseUrl, formData, token) {
    try {
        let feeds = await fetch(`${baseUrl}api/likeComment`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function doUnlikeComment(baseUrl, formData, token) {
    try {
        let feeds = await fetch(`${baseUrl}api/unlikeComment`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function getPostComments(baseUrl, postId, pageNumber) {
    try {
        let feeds = await fetch(`${baseUrl}api/comments/${postId}?page=${pageNumber}`);
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function getPostsByCategory(baseUrl, categoryId, pageId) {
    try {
        let feeds = await fetch(`${baseUrl}api/category/${categoryId}?page=${pageId}`);
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function doLogin(baseUrl, formData) {
   
    try {
        let feeds = await fetch(`${baseUrl}api/login`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function fetchUserProfile(baseUrl, userToken) {
    try {
        let feeds = await fetch(`${baseUrl}api/user`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function fetchUserReferrals(baseUrl, userToken) {
    try {
        let feeds = await fetch(`${baseUrl}api/referrals`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function fetchUserEarnings(baseUrl, userToken) {
    try {
        let feeds = await fetch(`${baseUrl}api/earnings`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function fetchUserPayouts(baseUrl, userToken) {
    try {
        let feeds = await fetch(`${baseUrl}api/payouts`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${userToken}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function doPostComment(baseUrl, formData, token) {
    try {
        let feeds = await fetch(`${baseUrl}api/writeComment`, {
            method: 'post',
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function doDeleteComment(baseUrl, id, token) {
    try {
        let feeds = await fetch(`${baseUrl}api/deleteComment/${id}`, {
            method: 'delete',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}

export async function fetchUserPosts(baseUrl, pageId, token) {
    try {
        let feeds = await fetch(`${baseUrl}api/user/posts?pageId=${pageId}`, {
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn(e.message)
    }
}
//'Content-Type': 'multipart/form-data,octet-stream',
export async function createFilePost(baseUrl, token, payload){
    let link = `${baseUrl}api/writePost`
    
    RNFetchBlob.fetch('POST', link, {
        Authorization: `Bearer ${token}`,
        body: payload,
      
        'Content-Type' : 'application/octet-stream',
        })
    .then((response) => response.json())
    .then((RetrivedData) => {
      console.log(RetrivedData);
    })
    .catch((err) => {
    console.log("tis is the errr", err);
    })
}

export async function createPost(baseUrl, token, payload) {
    // console.warn(baseUrl)
    // console.warn(token)
    
    console.log("sessionssss", token)
    console.log("bbaseurlll", baseUrl)
    console.warn("this is the payload",payload)
    
    let link = `${baseUrl}api/writePost`
    console.log("full link", link)
    try {
        let feeds = await fetch(link, {
            body: payload,
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
                'Accept': 'application/json',
                'Content-Type' : 'multipart/form-data',
            }
        });
        let result = await feeds.json();
        feeds = null;
        return result;
    } catch (e) {
        console.log("full error",e)
        console.warn('--msg ' + e.message)
    }
}

export async function updatePost(baseUrl, token, payload, postId) {
    // console.warn(baseUrl)
    // console.warn(token)
    console.warn(payload)
    // return
    try {
        let feeds = await fetch(`${baseUrl}api/editPost/${postId}`, {
            body: payload,
            method: 'post',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn('--' + e.message)
    }
}

export async function deleteUserPost(baseUrl, token, id) {
  
    try {
        let feeds = await fetch(`${baseUrl}api/deletePost/${id}`, {
            method: 'delete',
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            }
        });
        let result = await feeds.json();

        feeds = null;
        return result;
    } catch (e) {
        console.warn('--' + e.message)
    }
}