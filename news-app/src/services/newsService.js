import axios from 'axios';
import { APPCODE } from './config.js'

/**
 * 获取所有新闻类别
 */
export async function getNewsChannels() {

    let resp = await axios.get('http://ali-news.showapi.com/channelList', {
        headers: {
            Authorization: `APPCODE ${APPCODE}` 
        }
    });
    return resp.data.showapi_res_body.channelList;
}

/**
 * 按照频道，分页获取新闻
 * @param {*} channelId  频道ID
 * @param {*} page       页码，从1开始   
 * @param {*} limit      每页多少条数据
 */
export async function getNews(channelId, page = 1, limit = 10) {
    let resp = await axios.get('http://ali-news.showapi.com/newsList',{
        headers: {
            Authorization: `APPCODE ${APPCODE}` 
        },
        params: {
            channelId,
            page,
            maxResult: limit,
            needAllList: false,
            needContent: 1,
        }
    })
    return resp.data.showapi_res_body.pagebean;
}