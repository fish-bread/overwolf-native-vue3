import { defineStore } from "pinia"
import {ref} from "vue";

export const useBackgroundStore = defineStore("background", () => {
  // The background store holds all of the app's background logic - hence its name. it has
  // many possible use cases, for example sharing data between windows, or, in our case,
  // managing which window is currently presented to the user. To that end, it holds a dictionary
  // of the windows available in the app.
    
   //获取当前窗体
    const overwolf = window.overwolf
    //是否全屏
    const is_max_window = ref(false);
   
    //获取单个窗体
    const desktop_window = ref();
    const background_window = ref();
    const ingame_window = ref();
    //游戏bool值相关
    const window_game_bool = ref({
        //是否下载炉石(炉石id:9898)
        is_download: false,
        //是否运行炉石传说
        is_running: false 
    })
    //游戏相关
    const window_game = {
        // 存储定时器 ID
        search_setInterval_id: undefined,
        //定时器
        settings_setInterval_func: (res,take) => {
            window_game.search_setInterval_id = setInterval(() => {
                window_game.searchRunningGame()
                console.log(`游戏炉石传说${take},重新执行搜索`,res.gameInfo)
            },5000)
        },
        //获取是否安装游戏炉石传说
        getDownloadGame: () => {
            overwolf.games.getGameInfo(9898,(res) => {
                if (res.success) {
                    console.log('存在游戏',res.gameInfo)
                    window_game_bool.value.is_download = true
                } else {
                    console.log('不存在游戏',res.gameInfo)
                    window_game_bool.value.is_download = false
                }
            })
        },
        //查看启动的游戏
        searchRunningGame: () => {
            overwolf.games.getRunningGameInfo2((res) => {
                console.log('RES',res)
                if (res.gameInfo && res.gameInfo.isRunning) {
                    console.log('游戏已启动',res.gameInfo)
                    console.log('游戏名称',res.gameInfo.title)
                    console.log('游戏id',res.gameInfo.classId)
                    console.log('游戏宽度',res.gameInfo.width)
                    console.log('游戏高度',res.gameInfo.height)
                    window_game_bool.value.is_running = false
                    if (res.gameInfo.classId === 9898) {
                        console.log('炉石传说正在进行')
                        clearInterval(window_game.search_setInterval_id)
                        window_game_bool.value.is_running = true
                        window_game.settings_setInterval_func(res,'正在运行')
                    } else {
                        console.log('启动的不是炉石传说',res.gameInfo.title)
                        clearInterval(window_game.search_setInterval_id)
                        window_game_bool.value.is_running = false
                        window_game.settings_setInterval_func(res,'没有启动')
                    }
                } else {
                    console.log('游戏未启动',res.gameInfo)
                    clearInterval(window_game.search_setInterval_id)
                    window_game_bool.value.is_running = false
                    window_game.settings_setInterval_func(res,'没有启动')
                }
            })
        }
    }
    //窗体的一切操作
    const window_size = {
        //获取background_window页面属性
        get_background_Window: () => {
            overwolf.windows.obtainDeclaredWindow('background',(res)=> {
                if (res.success) {
                    background_window.value = res.window
                    console.log('res', res.window)
                    console.log('backWindow的id和名字', res.window.id,res.window.name)
                } else {
                    console.log('主页面不存在')
                }
            })
        },
        //获取desktop_window页面属性
        get_desktop_Window: () => {
            overwolf.windows.obtainDeclaredWindow('desktop',(res)=> {
                if (res.success) {
                    desktop_window.value = res.window
                    console.log('res', res.window)
                    console.log('deskWindow的id和名字', res.window.id,res.window.name)
                } else {
                    console.log('主页面不存在')
                }
            })
        },
        //获取ingame_window页面属性
        get_ingame_Window: () => {
            overwolf.windows.obtainDeclaredWindow('in_game',(res)=> {
                if (res.success) {
                    ingame_window.value = res.window
                    console.log('res', res.window)
                    console.log('gameWindow的id和名字', res.window.id,res.window.name)
                } else {
                    resolve(null)
                    console.log('主页面不存在')
                }
            })
        },
        //最小化
        minimizeCurrentWindow: () => {
            if (!desktop_window.value) {
                console.log('最小不存在')
                return; 
            }
            overwolf.windows.minimize(desktop_window.value.id, res => {
                console.log('执行小',res)
            })
        },
        //全屏及恢复原样
        maximimizeCurrentWindow: () => {
            if (!desktop_window.value) {
                console.log('全屏不存在')
                return;
            }
            if (is_max_window.value) {
                overwolf.windows.restore(desktop_window.value.id, res => {
                    console.log('执行恢复',res)
                    is_max_window.value  = false
                })
            } else {
                overwolf.windows.maximize(desktop_window.value.id, res => {
                    console.log('执行大',res)
                    is_max_window.value  = true
                }) 
            }
        },
        //拖动区
        setCurrentWindowDrag: () => {
            if (!desktop_window.value) {
                console.log('拖动不存在')
                return;
            }
            overwolf.windows.dragMove(desktop_window.value.id, res => {
                console.log('执行拖动',res)
            })
        },
        //退出应用
        exitApp: () => {
            if (!desktop_window.value && !background_window.value) {
                console.log('退出不存在')
                return;
            }
            overwolf.windows.close(background_window.value.id, res => {
                console.log('执行退出',res)
            })
        }
    }
    //新窗体的创建
    const window_create = {
        //创建desktop窗体
        createDesktopWindow: () => {
            overwolf.windows.obtainDeclaredWindow("desktop", {useDefaultSizeAndLocation: true}, res => {
                if (res.success) {
                    console.log('创建成功',res.window.id)
                    overwolf.windows.restore(res.window.id, (res) => {})
                } else {
                     console.error('创建失败:', res.error)
                 }
             })
        },
        //创建in_game窗体
        createIngameWindow: () => {
            overwolf.windows.obtainDeclaredWindow("in_game", {useDefaultSizeAndLocation: true}, res => {
                if (res.success) {
                    console.log('创建成功',res.window.id)
                } else {
                    console.error('创建失败:', res.error)
                }
            })
        }
}

    return {window_size, window_create, window_game, window_game_bool}
})
