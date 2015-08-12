def exploit():
	locatip=fuck.localip()
	sart=locatip.split('.')
	ip_prefix='%s.%s.%s'%(sart[0],sart[1],sart[2])
	for i in range(1,10):
		ip=fuck.pinger('%s.%s'%(ip_prefix,i))
		if ip:
			fuck.report('pinger','%s Onlink'%ip)
			print 'ip:%s onlink'%ip
print 'start'
exploit()
print 'end'
