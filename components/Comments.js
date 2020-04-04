import React, { Component } from 'react';
import { View, TouchableOpacity, Image, TextInput } from 'react-native';
import { getPostComments, doLikeComment, doUnlikeComment, doPostComment, doDeleteComment } from '../services/ApiServices'
import moment from 'moment';

class Comments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isBtnClicked: false,
            baseUrl: null,
            postId: null,
            commentsData: [],
            commentsCount: null,
            currentPage: null,
            lastPage: null,

            commentsLiked: [],
            session: null,
            myComment: '',
            isBtnDisabled: true,
            isPosting: false,
            isDeleting: false,
            commentId: 0
        };
    }

    handleLoadComments = () => {
        this.fetchPostComments()
    }

    fetchPostComments = () => {
        this.setState({
            isLoading: true,
            isBtnClicked: true
        })
        const { postId, baseUrl, commentsLiked, session } = this.props

        getPostComments(baseUrl, postId, 1).then((data) => {

            this.setState({
                commentsData: data.data,
                commentsCount: data.total,
                currentPage: data.current_page,
                lastPage: data.last_page,
                isLoading: false,
                baseUrl: baseUrl,
                postId: postId,
                commentsLiked: commentsLiked,
                session: session
            })

        }).catch((e) => {
            console.warn(e.message)
        })
    }

    fetchPostComments_2 = () => {
        const { postId, baseUrl, commentsLiked, session } = this.props

        getPostComments(baseUrl, postId, 1).then((data) => {

            this.setState({
                commentsData: data.data,
                commentsCount: data.total,
                currentPage: data.current_page,
                lastPage: data.last_page,
                isLoading: false,
                baseUrl: baseUrl,
                postId: postId,
                commentsLiked: commentsLiked,
                session: session
            })

        }).catch((e) => {
            console.warn(e.message)
        })
    }

    handleInfiniteScroll = () => {
        console.log('Reached');
        if (this.state.currentPage < this.state.lastPage) {
            this.setState({
                // isRefreshing: true,
                currentPage: this.state.currentPage + 1,
            }, () => {
                getPostComments(this.state.baseUrl, this.state.postId, this.state.currentPage).then((data) => {
                    // let news = data.data
                    this.setState({
                        commentsData: [...this.state.commentsData, ...data.data],
                        // currentPage: data.current_page,
                        // isRefreshing: false
                    })
                    console.log(this.state.currentPage)
                }).catch((e) => {
                    console.warn(e.message)
                })
            })
        }
    }

    handleLike = (item) => {
        const { baseUrl, session, commentsLiked, commentsData } = this.state
        const { id } = item

        let formData = new FormData();
        formData.append('commentId', id);

        if (session != null) {
            if (commentsLiked.includes(id)) {

                doUnlikeComment(baseUrl, formData, session.token).then((data) => {
                    if (data.success) {
                        let _commentsLiked = commentsLiked.filter((e) => {
                            return e != id
                        })

                        const index = commentsData.findIndex((e) => e.id === id);
                        let _items = [...commentsData]
                        let _item = { ..._items[index] }
                        _item.likes = _item.likes - 1
                        _items[index] = _item

                        this.setState({
                            commentsLiked: _commentsLiked,
                            commentsData: _items
                        })


                    }
                }).catch((e) => {
                    console.warn(e)
                })

            } else {

                doLikeComment(baseUrl, formData, session.token).then((data) => {
                    if (data.success) {
                        let arr = commentsLiked
                        arr.push(id)

                        const index = commentsData.findIndex((e) => e.id === id);
                        let _items = [...commentsData]
                        let _item = { ..._items[index] }
                        _item.likes = _item.likes + 1
                        _items[index] = _item

                        this.setState({
                            commentsLiked: arr,
                            commentsData: _items
                        })
                    }
                }).catch((e) => {
                    console.warn(e)
                })

            }
        }
    }

    handlePostComment = () => {
        const { postId, baseUrl, myComment, session } = this.state

        this.setState({
            isBtnDisabled: true,
            isPosting: true
        })

        if (myComment.trim().length < 1) {
            this.setState({
                isPosting: false
            })
            return
        }

        let formData = new FormData();
        formData.append('postId', postId);
        formData.append('comment', myComment);

        doPostComment(baseUrl, formData, session.token).then((data) => {
            if (data) {
                // console.warn(data)
                if (data.success) {
                    Toast.show({
                        text: 'Comment posted succcessfully',
                        textStyle: { fontSize: 12 },
                        buttonText: "",
                        duration: 2500,
                        type: "success"
                    })

                    this.setState({
                        isPosting: false,
                        myComment: ''
                    }, () => {
                        this.fetchPostComments_2()
                    })
                } else if (data.errors) {
                    if (data.errors.comment) {
                        Toast.show({
                            text: data.errors.comment,
                            textStyle: { fontSize: 12 },
                            buttonText: "",
                            duration: 2500,
                            type: "danger"
                        })
                    } else {
                        Toast.show({
                            text: 'Your comment cannot be posted at the moment',
                            textStyle: { fontSize: 12 },
                            buttonText: "",
                            duration: 2500,
                            type: "danger"
                        })
                    }

                    this.setState({
                        isBtnDisabled: false,
                        isPosting: false
                    })
                }
                else {
                    Toast.show({
                        text: 'Your comment cannot be posted at the moment',
                        textStyle: { fontSize: 12 },
                        buttonText: "",
                        duration: 2500,
                        type: "danger"
                    })

                    this.setState({
                        isBtnDisabled: false,
                        isPosting: false
                    })
                }
            } else {
                Toast.show({
                    text: 'Your comment cannot be posted at the moment',
                    textStyle: { fontSize: 12 },
                    buttonText: "",
                    duration: 2500,
                    type: "danger"
                })
            }
        }).catch((e) => {
            console.warn(e.message)
            this.setState({
                isBtnDisabled: false,
                isPosting: false
            })
        })
    }

    handleDeletePost = (id) => {
        const { baseUrl, session } = this.state
        this.setState({
            isDeleting: true,
            commentId: id
        })

        doDeleteComment(baseUrl, id, session.token).then((data) => {
            if (data.success) {
                Toast.show({
                    text: data.success,
                    textStyle: { fontSize: 12 },
                    buttonText: "",
                    duration: 2500,
                    type: "success"
                })

                this.fetchPostComments_2()
            } else {
                Toast.show({
                    text: 'Comment could not be deleted at moment',
                    textStyle: { fontSize: 12 },
                    buttonText: "",
                    duration: 2500,
                    type: "danger"
                })
            }
            this.setState({
                isDeleting: false,
                commentId: 0
            })
        }).catch((e) => {
            console.warn(e.message)
            this.setState({
                isDeleting: false,
                commentId: 0
            })
        })
    }

    renderComments = (item) => {
        const { comment, created_at, likes, id, user } = item
        const {isDeleting, session, commentId} = this.state
        const time = moment(created_at || moment.now()).fromNow()
        const imgPath = `${this.state.baseUrl}${item.user.profile.avatar}`
        let likeImg = this.state.commentsLiked.includes(id) ? require('../images/red-heart.png') : require('../images/grey-heart.png')
        let isMe = (user.id == session.id) ? true : false

        return (
            <ListItem thumbnail noIndent>
                <Left>
                    <Thumbnail square source={{ uri: imgPath }} />
                </Left>
                <Body>
                    <Text style={{ fontSize: 13 }}>{comment}</Text>

                    <View style={{ flex: 1, justifyContent: 'space-between', flexDirection: 'row' }}>
                        <Text style={{ fontSize: 12 }} note>{time} by {item.user.username}</Text>

                        <View style={{ flex: 1, justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => this.handleLike(item)}>
                                <Image style={{ width: 17, height: 17 }} source={likeImg} />
                            </TouchableOpacity>
                            <Text note style={{ marginLeft: 3 }}>{likes}</Text>
                        </View>
                    </View>

                    {
                        (isMe) ? (
                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => this.handleDeletePost(id)}>
                                    <Text style={{ fontSize: 10, color: 'red' }}>Delete</Text>
                                </TouchableOpacity>
                                {
                                    (isDeleting && id == commentId) ? <Text style={{ fontSize: 9, color: '#999', fontStyle: 'italic' }}>Deleting comment...</Text> : null
                                }
                            </View>
                        ) : null
                    }

                </Body>
            </ListItem>
        )
    }

    render() {
        const { isBtnClicked, isLoading, commentsCount, commentsData, myComment, isBtnDisabled, isPosting } = this.state

        if (!isBtnClicked) {
            return (
                <View style={{ margin: 10 }}>
                    <Button bordered block small style={{ borderColor: 'green' }} onPress={() => this.handleLoadComments()}>
                        <Text style={{ color: 'green' }}>View Comments</Text>
                    </Button>
                </View>
            );
        }

        if (isLoading) {
            return (
                <View style={{ marginTop: 22 }}>
                    <Spinner />
                </View>
            )
        }

        return (
            <Root>
                <View style={{ marginTop: 12 }}>
                    <Text style={{ marginBottom: 10 }}>Comments ({commentsCount})</Text>

                    <View style={{ flex: 1 }}>
                        <InputGroup borderType='rounded' iconRight style={{ flex: 1 }}>
                            <Input placeholder='Add comment here' placeholderTextColor='#ddd' style={{ fontSize: 12 }} onChangeText={(text) => this.setState({ myComment: text, isBtnDisabled: false })} value={myComment} />
                            <TouchableOpacity disabled={isBtnDisabled} onPress={() => this.handlePostComment()}>
                                <Icon name='send' style={{ color: 'green' }} />
                            </TouchableOpacity>
                        </InputGroup>
                        {
                            (isPosting) ? <Text style={{ fontSize: 9, color: '#999', fontStyle: 'italic' }}>Posting comment...</Text> : null
                        }
                        {/* <Button transparent iconCenter style={{ flex: 1, width: 30 }}>
                        <Icon style={{ color: 'green' }} name='send' />
                    </Button> */}
                    </View>
                    <View style={{ marginTop: 12 }}>
                        {
                            (commentsData.length < 1) ? (
                                <View style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                                    <Text note style={{ marginTop: 10 }}>No comments in post</Text>
                                </View>
                            ) : (
                                    <List
                                        dataArray={commentsData}
                                        keyExtractor={(item, index) => 'key' + index}
                                        renderRow={item => this.renderComments(item)}
                                        onEndReached={() => { this.handleInfiniteScroll() }}
                                        onEndReachedThreshold={0.01}
                                        scrollEnabled={!isLoading}
                                    />
                                )
                        }
                    </View>

                </View>
            </Root>
        );
    }
}

export default Comments;