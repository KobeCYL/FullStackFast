declare namespace API {
  type deleteUserIdParams = {
    id: string;
  };

  type getApiUserCurrentUserParams = {
    timer?: string;
  };

  type getApiUserParams = {
    username?: string;
    url?: string;
    startTime?: string;
    endTime?: string;
  };

  type getUserIdParams = {
    id: string;
  };

  type patchApiUserIdParams = {
    id: string;
  };
}
