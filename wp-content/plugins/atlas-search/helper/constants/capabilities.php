<?php

namespace Wpe_Content_Engine\Helper\Constants;

class Capabilities {

	public const ELASTICSEARCH       = 'ELASTICSEARCH';
	public const STATIC_SITE_REBUILD = 'STATIC_SITE_REBUILD';

	public const LABELS = array(
		self::ELASTICSEARCH       => 'Search',
		self::STATIC_SITE_REBUILD => 'Static Site Rebuild',
	);
}
