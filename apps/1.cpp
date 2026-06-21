#include<stdio.h>
#include<stdlib.h>
#include<graphics.h>
#include<conio.h> //控制台输入输出文件          ——————第10节课
int main(){
	printf("你好\n");
	system("pause");
	system("cls");
	printf("欢迎游玩《飞鸟DEMO》\n");
	system("pause");
	system("cls");
	printf("在我们拼命启动之前的时间需要获取你的虚拟名称\n");
	printf("\n");
	printf("所以你的名字是(不要超过10个字符，这可能是致命错误！)---------名字:");
	char userName[11];
	scanf("%s",&userName);
	system("cls");
	printf("哇哦！我知道你的名字是  ");
	printf("%s",userName);
	printf(" !\n");
	system("pause");
	system("cls");
	printf("n.享受 adj.享受的\n");
	system("pause");
	system("exit");
	//小鸟的位置、半径、向下的速度、向下的加速度——————第10节课
	int x=150,y=100,r=20,vy=0,g=1;
	//这是屏幕的宽和高
	int w=400,h=700;
	//管子左上角的x,管子的宽度,空隙的y，空隙高度——————第10节课
	int gx=w,gw=100,ky=100,kh=200;

	//草坪的偏移量
	int cp = 0;
	//创建绘图窗口
	initgraph(w,h);
	BeginBatchDraw();
	//游戏的循环
	while(1){
		// 1 绘制  2等待  3 移动 4 清屏
		//画草坪
		setlinecolor(GREEN);
		//画草坪的循环(5次)
		for(int i=0;i<5;i++){
			line( w/4*i+cp , 500 , w/4*i+w/8+cp , 450 );
			line( w/4*i+w/8+cp , 450 , w/4*i+w/4+cp , 500 );
		}
		setfillcolor(BLACK);
		outtextxy(0,0,userName);
		setfillcolor(GREEN);
		floodfill(w/2,h-1,GREEN);
		//画管子                             ——————第10节课
		setfillcolor(BLUE);
		solidrectangle(gx,0,gx+gw,h);
		setfillcolor(WHITE);
		solidrectangle(gx,ky,gx+gw,ky+kh);
		setfillcolor(BLACK);
		outtextxy(0,0,userName);

		//画鸟                               ——————第10节课
		setfillcolor(RED);
		solidcircle(x,y,r);
		setfillcolor(WHITE);
		solidcircle(x+r/2,y-r/2,5);
		setfillcolor(BLACK);
		solidcircle(x+r/2,y-r/2,2);
		//等待
		FlushBatchDraw();
		Sleep(20);
		int pz=0;
		for(int tx=gx;tx<=gx+gw;tx++){
			COLORREF c=getpixel(tx,ky);
			if(c==RED){
				pz=1;
				break;
			}
			c=getpixel(tx,ky+kh);
			if(c==RED){
				pz=1;
				break;
			}
		}
		for(int ty=0;ty<=ky;ty++){
			COLORREF c=getpixel(gx,ty);
			if(c==RED){
				pz=1;
				break;
			}
			if(c==RED){
				pz=1;
				break;
			}
		}
		if(pz==1){
			setfillcolor(RED);
			outtextxy(0,15,"游戏结束");
			outtextxy(0,30,"游戏将在5秒后销毁。");
			Sleep(1000);
			outtextxy(0,30,"游戏将在4秒后销毁。");
			Sleep(1000);
			outtextxy(0,30,"游戏将在3秒后销毁。");
			Sleep(1000);
			outtextxy(0,30,"游戏将在2秒后销毁。");
			Sleep(1000);
			outtextxy(0,30,"游戏将在1秒后销毁。");
			Sleep(1000);
			outtextxy(0,30,"游戏将在0秒后销毁。");
			Sleep(1000);
			break;
		}
		//移动草坪
		cp=cp-1;
		//判断第一块草坪完全移动出去
		if(cp <= -w/4){
			cp=0;
		}
		//移动小鸟                           ——————第10节课
		y=y+vy;
		vy=vy+g;//向下的速度加快
		if( kbhit() ){ //判断是否有按键按下
			char c = getch();//获取按下的按键
			if( c==' ' ){ //如果是空格键
				vy=-7.5; //让速度向上
			}
		}
		//移动管子                           ——————第10节课
		gx=gx-2;
		if(gx<=-gw){ //当管子完全移出屏幕
			gx=w; //让管子回到屏幕右边去
			ky=rand()%(450-kh); //随机产生空隙位置
			setfillcolor(BLACK);
			outtextxy(0,0,userName);
		}
		//清屏
		setfillcolor(WHITE);
		solidrectangle(0,0,w,h);
	}
	return 0;
}