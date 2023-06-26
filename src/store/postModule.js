import axios from "axios";

export const postModule = {
    state: () =>({
        posts: [],
        isPostLoading: false,
        searchQuery: '',
        selectedSort: '',
        page: 1,
        postsOnPage: 10,
        totalPages: 0,

        sortOptions: [
            {value: 'title', name: 'Sort by title'},
            {value: 'body', name: 'Sort by body'},
            {value: 'id', name: 'Sort by id'}
        ]
    }),
    // getters = computed
    getters: {
        sortedPosts(state) {
            const titleOrBody = state.selectedSort === 'title' || state.selectedSort === 'body'
            console.log(titleOrBody)
            return titleOrBody
                ? [...state.posts].sort((post1, post2) => post1[state.selectedSort]?.localeCompare(post2[state.selectedSort]))
                : [...state.posts].sort((post1, post2) => post1[state.selectedSort] - post2[state.selectedSort])
        },
        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter(post => post.title?.toLowerCase().includes(state.searchQuery.toLowerCase()))
        }
    },
    mutations: {
        setPosts(state, posts){
            state.posts = posts
        },
        setLoading(state, isLoading){
            state.isPostLoading = isLoading
        },
        setSearchQuery(state, searchParams){
            state.searchQuery = searchParams
        },
        setSelectedSort(state, selectedSort){
            state.selectedSort = selectedSort
        },
        setPage(state, page){
            state.page = page
        },
        setPostsOnPage(state, postsOnPage){
            state.postsOnPage = postsOnPage
        },
        setTotalPages(state, totalPages){
            state.totalPage = totalPages
        }
    },
    actions: {
        async fetchPosts({state, commit}) {
            try {
                commit('setLoading', true)
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10`, {
                    params: {
                        _page: state.page,
                        _limit: state.postsOnPage
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.postsOnPage))
                commit('setPosts', response.data)
            } catch (err) {
                console.log(err)
            } finally {
                commit('setLoading', false)
            }
        },

        async loadMorePosts({state, commit}) {
            try {
                commit('setPage', state.page += 1)
                const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10`, {
                    params: {
                        _page: state.page,
                        _limit: state.postsOnPage
                    }
                })
                commit('setTotalPages', Math.ceil(response.headers['x-total-count'] / state.postsOnPage))
                commit('setPosts', [...state.posts, ...response.data])
            } catch (err) {
                console.log(err)
            }
        },
    },
    namespaced: true
}