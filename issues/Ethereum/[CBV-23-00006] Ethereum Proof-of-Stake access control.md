# Ethereum Proof-of-Stake access control

The weakness was published 10/21/2021. The advisory is shared at [arxiv.org](https://vuldb.com/?advisory_url.185145). This vulnerability is uniquely identified as [CVE-2021-42764](https://vuldb.com/?source_cve.185145) since 10/20/2021. Technical details are unknown but a public exploit is available. MITRE ATT&CK project uses the attack technique [T1068](https://vuldb.com/?vulnerability_attck.185145) for this issue.

### CBV ID: CBV-23-00006
### Blockchain: Ethereum
### Version affected: Ethereum 2.0
### Component: Consensus
### Severity: 6.6
### Vulnerability Type: Denial of service
### Credits: @BMogetta
### Last updated: 18 Sep 2023

## Details

The Proof-of-Stake (PoS) Ethereum consensus protocol through 2021-10-19 allows an adversary to cause a denial of service (long-range consensus chain reorganizations), even when this adversary has little stake and cannot influence network message propagation. This can cause a protocol stall, or an increase in the profits of individual validators.

## Recomendations

Not specified

## References

https://arxiv.org/pdf/2110.10086.pdf
https://www.cve.org/CVERecord?id=CVE-2021-42766

### Labels: Layer 1

## Test



## Aditional comments


