# coding: utf-8

Gem::Specification.new do |spec|
  spec.name          = "Projectportfolio"
  spec.version       = "0.1.0"
  spec.authors       = ["José Manuel Torrente Delgado"]
  spec.email         = ["jmtorrented@gmail.com"]

  spec.summary       = %q{Photography and DIY projects}
  spec.homepage      = "https://jmtorrente.github.io/"
  spec.license       = "MIT"

  spec.files         = `git ls-files -z`.split("\x0").select do |f|
    f.match(%r!^(assets|_(includes|layouts|sass)/|(LICENSE|README)((\.(txt|md|markdown)|$)))!i)
  end

  spec.platform      = Gem::Platform::RUBY
  spec.add_runtime_dependency "jekyll", "~> 3.6"
  spec.add_runtime_dependency "jekyll-seo-tag", "~> 2.3"
  spec.add_runtime_dependency "jekyll-sitemap", "~> 1.1"

  spec.add_development_dependency "bundler", "~> 2.1.4"
  spec.add_development_dependency "rake", "~> 10.0"
end
