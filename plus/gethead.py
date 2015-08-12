print 'start'
http_head=fuck.get_head(test_url)
if http_head== False:
	sys.exit(1)
if http_head.getheader("server"):
	server=http_head.getheader("server")
else:
	server='CDN'
if http_head.getheader("x-powered-by"):
	waf=http_head.getheader("x-powered-by")
else:
	waf='NULL'
if server.find('CNYUNAN')>-1:
	fuck.report('gethead','%s|%s'%('深圳云安网站卫士',waf))
	result='%s|%s|%s'%(test_url,u'深圳云安网站卫士',waf)
	print result
elif http_head.getheader("X-Powered-By-Anquanbao"):
	fuck.report('gethead','%s|%s'%(server,'Anquanbao'))
	result='%s|%s|%s'%(test_url,server,u'安全宝')
	print result
elif http_head.getheader("x-powered-by-360wzb"):
	fuck.report('gethead','%s|%s'%(server,'360wzb'))
	result='%s|%s|%s'%(test_url,server,u'360网站卫士')
	print result
elif http_head.getheader("x-cache"):
	fuck.report('gethead','%s|%s'%(server,'jiasule'))
	result='%s|%s|%s'%(test_url,server,u'加速乐')
	print result
elif waf.find('Safe3')>-1:
	fuck.report('gethead','%s|%s'%(server,waf))
	result='%s|%s|%s'%(test_url,server,'Safe3WAF')
	print result
elif waf.find('WAF/')>-1:
	fuck.report('gethead','%s|%s'%(server,waf))
	result='%s|%s|%s'%(test_url,server,u'网站安全狗')
	print result
else:
	fuck.report('gethead','%s|%s'%(server,waf))
	result='%s|%s|%s'%(test_url,server,waf)
	print result
nginx_test_url='http://%s/robots.txt'%test_url
nginx_test=fuck.urlget(nginx_test_url)
if nginx_test.getcode() == 200:
	md5_1=fuck.get_md5(nginx_test.read())
	md5_2=fuck.get_md5(fuck.urlget('http://%s/robots.txt/1.php'%test_url).read())
	if md5_1==md5_2:
		fuck.report('nginx_CommandExec','http://%s/robots.txt/1.php'%test_url)
		result='nginx_CommandExec: http://%s/robots.txt/1.php'%test_url
		print result
print 'end'
