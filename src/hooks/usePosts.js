import axios from "axios";
import {onMounted, ref} from "vue";

export function usePosts(postLimit) {
    const posts = ref([])
    const totalPages = ref(0)
    const isPostLoading = ref(false)
    const fetching = async () => {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=10`, {
                params: {
                    _page: 1,
                    _limit: postLimit
                }
            })
            totalPages.value = Math.ceil(response.headers['x-total-count'] / postLimit)
            posts.value = response.data
        } catch (err) {
            isPostLoading.value = false
        }
    }
     onMounted(fetching)

    return {
       posts, totalPages, isPostLoading
    }
}
