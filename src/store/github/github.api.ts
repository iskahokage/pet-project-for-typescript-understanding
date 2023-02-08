import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IGitUser, IRepo, IServerResponse } from "../../types/types";

export const githubApi = createApi({
    reducerPath: "github/api",

    baseQuery: fetchBaseQuery({
        baseUrl: "https://api.github.com/",
    }),

    endpoints: (build) => ({
        searchUsers: build.query<IGitUser[], string>({
            query: (seach: string) => ({
                url: `search/users`,
                params: {
                    q: seach,
                    per_page: 10
                },
            }),
            transformResponse: (res: IServerResponse) => res.items
        }),
        getUserRepos: build.query<IRepo[], string>({
            query: (username: string) => ({
                url: `users/${username}/repos`
            })
        })
    }),
});

export const { useSearchUsersQuery, useLazyGetUserReposQuery } = githubApi;
