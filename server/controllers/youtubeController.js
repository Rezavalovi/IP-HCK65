let axios = require("axios");

class Controller {
  static async getTrailerMovie(req, res, next) {
    try {
      let data = await axios({
        url: `https://youtube138.p.rapidapi.com/search/?q=trailermovie`,
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "d27cc8bf0dmshb3eb04f95df584ap105440jsn8c17cfab10c1",
          "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
        },
      });
      let contents = [...data.data.contents];

      let response = [];

      contents.forEach((el) => {
        if (el.type === "video") {
          response.push({
            avatarUrl: el.video?.author?.avatar[0]?.url,
            type: el.type,
            canonicalBaseUrl: el.video?.author?.canonicalBaseUrl,
            channelId: el.video?.author?.channelId,
            titleChannel: el.video?.author?.title,
            description: el.video?.descriptionSnippet,
            thumbnailUrl: el.video?.thumbnails[0]?.url,
            views: el.video?.stats?.views,
            videoId: el.video?.videoId,
            titleVideo: el.video?.title,
          });
        }
      });
      res.status(200).json(response.sort());
    } catch (error) {
      next(error);
    }
  }

  static async getReactJs(req, res, next) {
    try {
      let data = await axios({
        url: `https://youtube138.p.rapidapi.com/search/?q=reactjstutorial`,
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "d27cc8bf0dmshb3eb04f95df584ap105440jsn8c17cfab10c1",
          "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
        },
      });
      let contents = [...data.data.contents];

      let response = [];

      contents.forEach((el) => {
        if (el.type === "video") {
          response.push({
            avatarUrl: el.video?.author?.avatar[0]?.url,
            type: el.type,
            canonicalBaseUrl: el.video?.author?.canonicalBaseUrl,
            channelId: el.video?.author?.channelId,
            titleChannel: el.video?.author?.title,
            description: el.video?.descriptionSnippet,
            thumbnailUrl: el.video?.thumbnails[0]?.url,
            views: el.video?.stats?.views,
            videoId: el.video?.videoId,
            titleVideo: el.video?.title,
          });
        }
      });
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async search(req, res, next) {
    try {
      let search = req.params.search;
      search.split(" ").join("+");
      let data = await axios({
        url: `https://youtube138.p.rapidapi.com/search/?q=${search}`,
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "d27cc8bf0dmshb3eb04f95df584ap105440jsn8c17cfab10c1",
          "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
        },
      });
      let contents = [...data.data.contents];

      let response = [];

      contents.forEach((el) => {
        if (el.type === "video") {
          response.push({
            avatarUrl: el.video?.author?.avatar[0]?.url,
            type: el.type,
            canonicalBaseUrl: el.video?.author?.canonicalBaseUrl,
            channelId: el.video?.author?.channelId,
            titleChannel: el.video?.author?.title,
            description: el.video?.descriptionSnippet,
            thumbnailUrl: el.video?.thumbnails[0]?.url,
            views: el.video?.stats?.views,
            videoId: el.video?.videoId,
            titleVideo: el.video?.title,
          });
        }
      });

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async videoDetail(req, res, next) {
    try {
      let id = req.params.id;
      let data = await axios({
        url: `https://youtube138.p.rapidapi.com/video/details/?id=${id}`,
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "d27cc8bf0dmshb3eb04f95df584ap105440jsn8c17cfab10c1",
          "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
        },
      });
      let response = {
        avatar: data.data.author?.avatar[0]?.url,
        channelId: data.data.author?.channelId,
        subscribers: data.data.author?.stats?.subscribersTex,
        titleChannel: data.data.author?.title,
        category: data.data.category,
        description: data.data.description,
        thumbnail: data.data.thumbnails[0]?.url,
        videoId: data.data.videoId,
        titleVideo: data.data.title,
        release: data.data.publishedDate,
        totalComment: data.data.stats.comments,
        totalLike: data.data.stats.likes,
        totalViews: data.data.stats.views,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async comments(req, res, next) {
    try {
      let id = req.params.id;
      let data = await axios({
        url: `https://youtube138.p.rapidapi.com/video/comments/?id=${id}`,
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "d27cc8bf0dmshb3eb04f95df584ap105440jsn8c17cfab10c1",
          "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
        },
      });
      let contents = [...data.data.comments];

      let response = [];

      contents.forEach((el) => {
        response.push({
          avatarUrl: el.author?.avatar[0]?.url,
          name: el.author?.title,
          comment: el.content,
          commentId: el.commentId,
          publishedTimeText: el.publishedTimeText,
        });
      });
      res.status(200).json({
        content: response,
        totalComment: data.data.totalCommentsCount,
      });
    } catch (error) {
      next(error);
    }
  }

  static async channelDetail(req, res, next) {
    try {
      let id = req.params.id;
      let data = await axios({
        url: `https://youtube138.p.rapidapi.com/channel/details/?id=${id}`,
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "d27cc8bf0dmshb3eb04f95df584ap105440jsn8c17cfab10c1",
          "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
        },
      });
      let response = {
        avatar: data.data.avatar[0]?.url,
        banner: data.data.banner?.desktop[0]?.url,
        canonicalBaseUrl: data.data.canonicalBaseUrl,
        channelId: data.data.channelId,
        country: data.data.country,
        joinDate: data.data.joinedDateText,
        description: data.data.description,
        title: data.data.title,
        subscribers: data.data.stats.subscribersText,
        views: data.data.stats.views,
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async channelVideos(req, res, next) {
    try {
      let id = req.params.id;
      let data = await axios({
        url: `https://youtube138.p.rapidapi.com/channel/videos/?id=${id}`,
        method: "GET",
        headers: {
          "X-RapidAPI-Key":
            "d27cc8bf0dmshb3eb04f95df584ap105440jsn8c17cfab10c1",
          "X-RapidAPI-Host": "youtube138.p.rapidapi.com",
        },
      });
      let contents = [...data.data.contents];

      let response = [];

      contents.forEach((el) => {
        if (el.type === "video") {
          response.push({
            avatarUrl: el.video?.author?.avatar[0]?.url,
            type: el.type,
            canonicalBaseUrl: el.video?.author?.canonicalBaseUrl,
            channelId: el.video?.author?.channelId,
            titleChannel: el.video?.author?.title,
            description: el.video?.descriptionSnippet,
            thumbnailUrl: el.video?.thumbnails[0]?.url,
            views: el.video?.stats?.views,
            videoId: el.video?.videoId,
            titleVideo: el.video?.title,
            date: el.video?.publishedTimeText,
          });
        }
      });
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
