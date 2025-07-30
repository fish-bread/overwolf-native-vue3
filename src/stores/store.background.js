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
            if (!desktop_window.value) {
                console.log('退出不存在')
                return;
            }
            overwolf.windows.close(desktop_window.value.id, res => {
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
    return {window_size, window_create}
})
